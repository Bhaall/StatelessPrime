/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package be.rubus.angularprime.build.maven;

import org.apache.maven.model.Resource;
import org.codehaus.plexus.util.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
public class CopyUpdatedFiles {

    private List resources;

    private File targetDirectory;

    private List<AngularPrimeResourceDirectory> resourceDirectoryInfo;

    private List<File> directoriesToProcess = new ArrayList<File>();

    public CopyUpdatedFiles(File someTargetDirectory, List someResources) {
        targetDirectory = someTargetDirectory;
        resources = someResources;
        resourceDirectoryInfo = new ArrayList<AngularPrimeResourceDirectory>();
    }

    public void execute() {
        Resource resource = (Resource) resources.get(0);

        List<String> names;
        try {
            names = FileUtils.getFileNames(new File(resource.getDirectory()), "**/*.css,**/*.js", null, true);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        scanResources(names, resource.getDirectory());

        copyResources();

    }

    /**
     * Copy those resources to build directory that are needed. This is the incremental stuff.
     */
    private void copyResources() {
        try {
            for (AngularPrimeResourceDirectory resourceDirectory : resourceDirectoryInfo) {
                if (resourceDirectory.isCopyResources()) {
                    // We have to process this directory

                    if (resourceDirectory.getTargetDirectory().exists()) {
                        // Clean directory is it exists
                        FileUtils.cleanDirectory(resourceDirectory.getTargetDirectory());
                    } else {
                        // Create the directory if not existing.
                        FileUtils.forceMkdir(resourceDirectory.getTargetDirectory());
                    }

                    // Copy all the resource files that needs to be in that directory.
                    for (String fileName : resourceDirectory.getResources()) {
                        FileUtils.copyFileToDirectory(new File(fileName), resourceDirectory.getTargetDirectory());
                    }

                    // Keep name of target directory for aggregation reasons.
                    directoriesToProcess.add(resourceDirectory.getTargetDirectory());
                }

            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Scan the file in the Resource Maven Model
     * @param resourceFileNames All resource files.
     * @param resourceDirectory Parent of all resource files
     */
    private void scanResources(List<String> resourceFileNames, String resourceDirectory) {
        int sourceDirLength = resourceDirectory.length();

        for (String fileName : resourceFileNames) {

            // cut of parent directory name
            String sourceFileName = fileName.substring(sourceDirLength);

            File sourceDir = new File(fileName);

            // define path specific for resource (so without parent directory name and file Name)
            String middleSectionDirectoryPart = sourceFileName.substring(0, sourceFileName.length() - sourceDir
                    .getName().length());

            // The full directory name of the target
            File fullTargetDirectory = new File(targetDirectory.getAbsolutePath() + middleSectionDirectoryPart);


            AngularPrimeResourceDirectory resourceTargetDirectory = new AngularPrimeResourceDirectory
                    (middleSectionDirectoryPart, fullTargetDirectory);

            // Check if object for 'path specific for resource' already exists
            int idx = resourceDirectoryInfo.indexOf(resourceTargetDirectory);

            if (idx != -1) {
                resourceTargetDirectory = resourceDirectoryInfo.get(idx);
            } else {
                resourceDirectoryInfo.add(resourceTargetDirectory);
            }

            resourceTargetDirectory.addResource(fileName);

            if (!fullTargetDirectory.exists()) {
                // When target directory doesn't exists, mark resource for copy
                resourceTargetDirectory.markForCopy();
            } else {

                // Check files in target directory
                File[] files = fullTargetDirectory.listFiles();


                if (files == null || files.length == 0) {
                    //No files, mark for copy
                    resourceTargetDirectory.markForCopy();
                } else {
                    // aggregated file older then resource file -> mark for copy.
                    if (files[0].lastModified() < sourceDir.lastModified()) {
                        resourceTargetDirectory.markForCopy();
                    }
                }

            }

        }
    }

    public List<File> getDirectoriesToProcess() {
        return directoriesToProcess;
    }
}
