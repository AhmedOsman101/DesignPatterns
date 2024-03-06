<?php

declare(strict_types=1); // Enables strict type checking

/**
 * Class Report
 * 
 * The Report class encapsulates methods for generating, reviewing, and saving reports.
 */
class Report {

    /**
     * @var string $content The content of the generated report.
     */
    public $content;

    /**
     * Generates a report from the provided content.
     * 
     * @param string $content The content of the report.
     * @return void
     */
    public function generateReport(string $content): void {
        $this->content = $content;
    }

    /**
     * Reviews a generated report and returns a boolean indicating if the report is empty.
     * 
     * @param Report $report The report to be reviewed.
     * @return bool True if the report is not empty, false otherwise.
     */
    static public function reviewReport(Report $report): bool {
        return empty($report->content) ? false : true;
    }

    /**
     * Saves the generated report content to a file.
     * 
     * @return void
     */
    public function saveToFile(): void {
        try {
            $file = fopen("Report.txt", "w");
            fwrite($file, $this->content);
            fclose($file);
        } catch (Throwable $error) {
            var_export($error->getMessage());
        }
    }
}


$report = new Report();

var_export(Report::reviewReport($report));

$report->generateReport("Report Created!");
$report->SaveToFile();

/* 

After Applying Single Responsibility Principle (SRP) 
I've exported the file saving logic into a separate class called FileManager and
also applied the SRP on the SaveToFile method because it was handling too much
stuff at once

*/


/**
 * Class ReportV2
 * 
 * 
 * The ReportV2 class is responsible for generating, reviewing, and exporting reports.
 * 
 * @property string $reportName The name of the report.
 * @property string $content The content of the generated report.
 */
class ReportV2 {
    public $reportName;
    public $content;

    /**
     * Constructs a ReportV2 instance with the specified report name.
     * 
     * @param string $reportName The name of the report.
     */
    public function __construct(string $reportName) {
        $this->reportName = $reportName;
    }

    /**
     * Generates the content for the report.
     * 
     * @param string $content The content of the report.
     * @return void
     */
    public function generateReport(string $content): void {
        $this->content = $content;
    }

    /**
     * Reviews the generated content and returns a boolean indicating if the report is empty.
     * 
     * @return bool True if the report is not empty, false otherwise.
     */
    static public function reviewReport(ReportV2 $report): bool {
        return empty($report->content) ? false : true;
    }

    /**
     * Exports the report to a file using the FileManager class.
     * 
     * @return void
     */
    public function exportReport(): void {
        $fileManager = new FileManager();
        $fileManager->saveToFile($this->reportName, $this->content);
    }
}

/**
 * Class FileManager
 * 
 * The FileManager class is responsible for handling file operations.
 * 
 * @property resource $file The file resource.
 */
class FileManager {

    public $file;

    /**
     * Opens a file with the specified filename and mode.
     * 
     * @param string $fileName The name of the file to be opened.
     * @param string $mode The mode in which to open the file (default is "r").
     * @return void
     */
    public function openFile(string $fileName, string $mode = "r"): void {
        $this->file = fopen($fileName, $mode);
    }

    /**
     * Writes content to the currently opened file.
     * 
     * @param string $content The content to be written to the file.
     * @return void
     */
    public function writeFile(string $content): void {
        fwrite($this->file, $content);
    }

    /**
     * Closes the currently opened file.
     * 
     * @return void
     */
    public function closeFile(): void {
        fclose($this->file);
    }

    /**
     * Saves content to a file with the specified filename.
     * 
     * @param string $fileName The name of the file to be saved (default is "newFile.txt").
     * @param string $content The content to be saved to the file.
     * @return void
     */
    public function saveToFile(string $fileName = "newFile.txt", string $content): void {
        try {
            $this->openFile($fileName, "w");
            $this->writeFile($content);
            $this->closeFile();
        } catch (Throwable $error) {
            var_export($error->getMessage());
        }
    }
}


$Report = new ReportV2("Report V2.txt");
echo "\n";
var_export(ReportV2::reviewReport($Report));
$Report->generateReport("Lorem ipsum dolor, sit amet consectetur adipisicing elit.");
$Report->ExportReport();
