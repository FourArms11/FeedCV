const { PDFParse } = require('pdf-parse');
const { generateReport } = require('../services/gemini.service');
const { createPdfFromReport } = require('../services/pdfGenerator');
const reportModel = require('../models/report.model');

async function generateInterviewReport(req, res) {
    const parser = new PDFParse({ data: req.file.buffer });
    const pdf = await parser.getText();
    const { selfDescription, jobDescription } = req.body;

    const Report = await generateReport({
        resume: pdf.text,
        selfDescription,
        jobDescription
    });

    await reportModel.create({
        user: req.user._id,
        resume: pdf.text,
        selfDescription,
        jobDescription,
        ...Report
    });

    const pdfBuffer = await createPdfFromReport({
        report: Report,
        user: req.user,
        selfDescription,
        jobDescription,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="FeedCV-interview-report.pdf"');
    res.status(200).send(pdfBuffer);
}



module.exports = {generateInterviewReport};