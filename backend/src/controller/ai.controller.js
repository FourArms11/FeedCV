const { PDFParse } = require('pdf-parse');
const { generateReport } = require('../services/gemini.service');
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

    const interviewReport = await reportModel.create({
        user: req.user._id,
        resume: pdf.text,
        selfDescription,
        jobDescription,
        ...Report
    });


    res.status(201).json({
        message: 'report generated successfully',
        interviewReport
    });
}



module.exports = {generateInterviewReport};