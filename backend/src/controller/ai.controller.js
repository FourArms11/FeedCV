const { PDFParse } = require('pdf-parse');
const { generateReport } = require('../services/gemini.service');
const reportModel = require('../models/report.model');

async function generateInterviewReport(req, res) {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({
        message: "Please upload a resume PDF.",
      });
    }

    const parser = new PDFParse({ data: req.file.buffer });
    let pdf;

    try {
      pdf = await parser.getText();
    } finally {
      await parser.destroy();
    }

    const { selfDescription, jobDescription } = req.body;

    const report = await generateReport({
      resume: pdf.text,
      selfDescription,
      jobDescription,
    });

    const normalizedReport = {
      ...report,
      score: report.score ?? report.Score ?? 0,
      preparationPlan: Array.isArray(report.preparationPlan)
        ? report.preparationPlan.map((item) => ({
            ...item,
            tasks: Array.isArray(item.tasks ?? item.task)
              ? item.tasks ?? item.task
              : [item.tasks ?? item.task].filter(Boolean),
          }))
        : [],
    };

    const createdReport = await reportModel.create({
      user: req.user.id,
      resume: pdf.text,
      selfDescription,
      jobDescription,
      ...normalizedReport,
    });

    res.status(200).json(createdReport);
  } catch (error) {
    console.error("Failed to generate interview report:", error);
    res.status(500).json({
      message: "Failed to generate interview report.",
      error: error.message || error,
    });
  }
}



module.exports = {generateInterviewReport};
