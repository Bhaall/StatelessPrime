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

import com.google.javascript.jscomp.CompilationLevel;
import com.google.javascript.jscomp.WarningLevel;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.apache.maven.project.MavenProject;
import org.apache.maven.shared.filtering.MavenResourcesFiltering;
import org.codehaus.plexus.util.FileUtils;
import org.primefaces.extensions.optimizerplugin.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * Generates (combines) and optimize the JavaScript and CSS files for AngularPrime.
 *
 * @goal generate-optimize-resources
 * @phase process-resources
 */
public class AngularDirectiveMojo extends AbstractMojo {

    private static final String[] DEFAULT_INCLUDES = {"**/*.css", "**/*.js"};

    private static final String[] DEFAULT_EXCLUDES = {};

    // Location of the output
    private static final String PRODUCTION_LOCATION = "/../build/production";

    private static final String DEVELOPMENT_LOCATION = "/../build/development";


    /**
     * The maven project.
     *
     * @parameter expression="${project}"
     * @readonly
     */
    private MavenProject project;

    /**
     * @component role="org.apache.maven.shared.filtering.MavenResourcesFiltering" role-hint="default"
     * @required
     */
    protected MavenResourcesFiltering mavenResourcesFiltering;

    /**
     * Encoding to read files.
     *
     * @parameter expression="${encoding}" default-value="UTF-8"
     * @required
     */
    private String encoding;

    /**
     * Compilation level for Google Closure Compiler.
     *
     * @parameter expression="${compilationLevel}" default-value="SIMPLE_OPTIMIZATIONS"
     */
    private String compilationLevel;

    /**
     * Warning level for Google Closure Compiler.
     *
     * @parameter expression="${warningLevel}" default-value="QUIET"
     */
    private String warningLevel;

    private List<File> directoriesToProcess;


    private DataUriTokenResolver dataUriTokenResolver;

    private String imagesDir;

    /**
     * Main entry point of the plugin.
     *
     * @throws MojoExecutionException
     * @throws MojoFailureException
     */
    public void execute() throws MojoExecutionException, MojoFailureException {
        getLog().info("Creation of AngularPrime resource artifacts started ...");

        imagesDir = project.getBasedir().getAbsolutePath() + "/src/main/resources/META-INF/resources";

        buildForProduction();
        buildForDevelopment();

    }

    private void processResources(File inputDirectory, boolean withoutCompress) throws MojoExecutionException {

        ResourcesScanner scanner = new ResourcesScanner();
        scanner.scan(inputDirectory, DEFAULT_INCLUDES, DEFAULT_EXCLUDES);

        Aggregation aggr = new Aggregation();
        aggr.setWithoutCompress(withoutCompress);

        for (File directory : directoriesToProcess) {
            try {
                getLog().info("Processing " + directory.getCanonicalPath());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            ResourcesScanner subDirScanner = new ResourcesScanner();
            subDirScanner.scan(directory, DEFAULT_INCLUDES, DEFAULT_EXCLUDES);

            Set<File> subDirCssFiles = filterSubDirFiles(scanner.getCssFiles(), subDirScanner.getCssFiles());
            if (!subDirCssFiles.isEmpty()) {

                // handle CSS files
                processCssFiles(directory, subDirCssFiles, getDataUriTokenResolver(), getSubDirAggregation(directory,
                        aggr, ResourcesScanner.CSS_FILE_EXTENSION), null);
            }

            Set<File> subDirJsFiles = filterSubDirFiles(scanner.getJsFiles(), subDirScanner.getJsFiles());
            if (!subDirJsFiles.isEmpty()) {
                // handle JavaScript files
                processJsFiles(directory, subDirJsFiles, getCompilationLevel(compilationLevel),
                        getWarningLevel(warningLevel), getSubDirAggregation(directory, aggr,
                        ResourcesScanner.JS_FILE_EXTENSION), null);
            }
        }
    }

    /**
     * Copies the JavaScript and CSS files from src\main\resources directory to the build directory.
     *
     * @param location Build directory location, relative to to Maven output directory.
     * @return
     * @throws MojoExecutionException
     */
    private File copyResources(String location) throws MojoExecutionException {

        File buildDirectory = new File(project.getBuild().getOutputDirectory() + location);
        CopyUpdatedFiles copier = new CopyUpdatedFiles(buildDirectory, project.getResources());
        copier.execute();

        directoriesToProcess = copier.getDirectoriesToProcess();

        return buildDirectory;
    }

    private void buildForDevelopment() throws MojoExecutionException {
        // Copy to the build directory
        File buildDirectory = copyResources(DEVELOPMENT_LOCATION);

        // Process the widgets that are updated
        processResources(buildDirectory, true);

        useDevelopmentResources(buildDirectory);
    }

    /**
     * Copy the files from the build directory to the web application location.
     *
     * @param buildDirectory The build location
     */
    private void useDevelopmentResources(File buildDirectory) {
        File webAppDirectory = new File(project.getBasedir(), "/src/main/webapp");
        File targetDirectory;
        try {
            List<String> names = FileUtils.getFileNames(buildDirectory, "**/*.css,**/*.js", null, true);
            for (String fileName : names) {
                String normalized = FileUtils.normalize(fileName);
                List<String> parts = extractImportantParts(normalized);
                //parts.add(1, "angularPrime");
                String targetDir = determineTargetLocation(parts, false);
                targetDirectory = new File(webAppDirectory, targetDir);
                FileUtils.copyFileToDirectory(fileName, targetDirectory.getAbsolutePath());
            }

        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }

    }

    private String determineTargetLocation(List<String> parts, boolean singleResource) {

        if (singleResource && "core.js".equals(parts.get(0))) {
            parts.remove(1);  // remove core subdirectory
        }
        if (!singleResource) {
            parts.remove(0);
            parts.add(parts.size() - 1, "libs");
        }
        StringBuilder result = new StringBuilder();
        for (int idx = parts.size(); idx > 0; idx--) {
            result.append('/').append(parts.get(idx - 1));
        }
        return result.toString();
    }

    private List<String> extractImportantParts(String normalized) {
        List<String> result = new ArrayList<String>();
        File f = new File(normalized);
        while (!("development".equals(f.getName()) || "production".equals(f.getName()))) {
            result.add(f.getName());
            f = f.getParentFile();
        }

        return result;
    }

    private void buildForProduction() throws MojoExecutionException {
        // Copy to the build directory
        File buildDirectory = copyResources(PRODUCTION_LOCATION);

        // Process the widgets that are updated
        processResources(buildDirectory, false);

    }

    private Aggregation getSubDirAggregation(final File dir, final Aggregation aggr, final String fileExtension) {
        Aggregation subDirAggr = new Aggregation();
        subDirAggr.setPrependedFile(aggr.getPrependedFile());
        subDirAggr.setRemoveIncluded(aggr.isRemoveIncluded());
        subDirAggr.setWithoutCompress(aggr.isWithoutCompress());
        subDirAggr.setSubDirMode(true);

        File outputFile = new File(dir, dir.getName() + "." + fileExtension);
        subDirAggr.setOutputFile(outputFile);

        return subDirAggr;
    }

    private CompilationLevel getCompilationLevel(final String compilationLevel) throws MojoExecutionException {
        try {
            return CompilationLevel.valueOf(compilationLevel);
        } catch (Exception e) {
            final String errMsg = "Compilation level '" + compilationLevel + "' is wrong. Valid constants are: " +
                    "'WHITESPACE_ONLY', 'SIMPLE_OPTIMIZATIONS', 'ADVANCED_OPTIMIZATIONS'";
            throw new MojoExecutionException(errMsg);

        }
    }

    private WarningLevel getWarningLevel(final String warningLevel) throws MojoExecutionException {
        try {
            return WarningLevel.valueOf(warningLevel);
        } catch (Exception e) {
            final String errMsg = "Warning level '" + warningLevel + "' is wrong. Valid constants are: 'QUIET', " +
                    "'DEFAULT', 'VERBOSE'";
            throw new MojoExecutionException(errMsg);
        }
    }

    private void processCssFiles(final File inputDir, final Set<File> cssFiles,
                                 final DataUriTokenResolver dataUriTokenResolver, final Aggregation aggr,
                                 final String suffix) throws MojoExecutionException {
        ResourcesSetAdapter rsa = new ResourcesSetCssAdapter(inputDir, cssFiles, dataUriTokenResolver, aggr,
                encoding, true, suffix);

        YuiCompressorOptimizer yuiOptimizer = new YuiCompressorOptimizer();
        yuiOptimizer.optimize(rsa, getLog());

    }

    private void processJsFiles(final File inputDir, final Set<File> jsFiles,
                                final CompilationLevel compilationLevel, final WarningLevel warningLevel,
                                final Aggregation aggr, final String suffix) throws MojoExecutionException {

        ResourcesSetAdapter rsa = new ResourcesSetJsAdapter(inputDir, jsFiles, compilationLevel, warningLevel, aggr,
                encoding, true, suffix);

        ClosureCompilerOptimizer closureOptimizer = new ClosureCompilerOptimizer();
        closureOptimizer.optimize(rsa, getLog());

    }

    private static Set<File> filterSubDirFiles(final Set<File> resSetFiles, final Set<File> subDirFiles) {
        Set<File> filteredFiles = new LinkedHashSet<File>();

        if (subDirFiles == null || subDirFiles.isEmpty() || resSetFiles == null || resSetFiles.isEmpty()) {
            return filteredFiles;
        }

        for (File subDirFile : subDirFiles) {
            if (resSetFiles.contains(subDirFile)) {
                filteredFiles.add(subDirFile);
            }
        }

        return filteredFiles;
    }

    private DataUriTokenResolver getDataUriTokenResolver() {
        if (dataUriTokenResolver != null) {
            return dataUriTokenResolver;
        }

        String[] arrImagesDir = imagesDir.split(",");
        File[] fileImagesDir = new File[arrImagesDir.length];
        for (int i = 0; i < arrImagesDir.length; i++) {
            fileImagesDir[i] = new File(arrImagesDir[i]);
        }

        dataUriTokenResolver = new DataUriTokenResolver(fileImagesDir);

        return dataUriTokenResolver;
    }

}
