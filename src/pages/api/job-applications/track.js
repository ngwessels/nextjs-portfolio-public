import { jobApplicationsDb } from "../../../lib/mongodb";
import { PortfolioViewNotification } from "../../../lib/email";

export default async (req, res) => {
  try {
    // Check request method
    if (req.method !== 'POST') {
      return res.status(405).json({
        message: 'Method Not Allowed',
        error: 'Only POST requests are allowed',
        success: false
      });
    }

    // Check if request body exists
    if (!req.body) {
      return res.status(400).json({
        message: 'Bad Request',
        error: 'Request body is required',
        success: false
      });
    }

    const { shortId } = req.body;

    if (!shortId || typeof shortId !== 'string') {
      return res.status(400).json({
        message: 'Validation Error',
        error: 'Short ID is required',
        field: 'shortId',
        success: false
      });
    }

    // Get additional tracking data from request
    const additionalData = {
      userAgent: req.headers['user-agent'] || null,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
      referrer: req.headers['referer'] || req.headers['referrer'] || null
    };

    // Track the view
    const result = await jobApplicationsDb.trackView(shortId, additionalData);

    if (!result.success) {
      return res.status(404).json({
        message: 'Not Found',
        error: result.error,
        success: false
      });
    }

    const jobApplication = result.jobApplication;

    // Send email notification (don't wait for it to avoid delaying response)
    try {
      const latestView = jobApplication.views[jobApplication.views.length - 1];

      PortfolioViewNotification({
        shortId: jobApplication.shortId,
        companyName: jobApplication.companyName,
        jobApplicationId: jobApplication.jobApplicationId,
        viewCount: jobApplication.viewCount,
        lastViewedAt: jobApplication.lastViewedAt,
        totalViews: jobApplication.views.length,
        viewDetails: {
          timestamp: latestView.timestamp,
          userAgent: latestView.userAgent,
          ip: latestView.ip,
          referrer: latestView.referrer
        }
      }).catch(emailError => {
        console.error('Failed to send portfolio view notification:', emailError);
        // Don't fail the request if email fails
      });
    } catch (emailSetupError) {
      console.error('Error setting up email notification:', emailSetupError);
      // Continue with response even if email setup fails
    }

    return res.status(200).json({
      message: 'View tracked successfully',
      success: true,
      trackingData: {
        shortId: jobApplication.shortId,
        companyName: jobApplication.companyName,
        jobApplicationId: jobApplication.jobApplicationId,
        viewCount: jobApplication.viewCount,
        lastViewedAt: jobApplication.lastViewedAt,
        totalViews: jobApplication.views.length
      }
    });

  } catch (err) {
    console.error('Job Application Tracking API Error:', err);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: 'Something went wrong on our end, please try again later',
      success: false
    });
  }
};
