// MongoDB v6 Driver Configuration
const mongodb = async () => {
  try {
    const { MongoClient } = require("mongodb");

    // Build connection URI
    const baseUri = `mongodb+srv://${process.env.DB_mongodb_user}:${process.env.DB_mongodb_passwd}@portfolio.dhhfm74.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio`;

    // MongoDB v6 driver connection options
    const options = {
      // Connection timeouts
      serverSelectionTimeoutMS: 5000, // How long to wait for server selection
      connectTimeoutMS: 10000, // How long to wait for initial connection
      socketTimeoutMS: 45000, // How long to wait for socket operations

      // Connection pool settings
      maxPoolSize: 10, // Maximum number of connections in pool
      minPoolSize: 2, // Minimum number of connections in pool

      // Retry and error handling
      retryWrites: true,
      retryReads: true,

      // Network settings
      family: 4, // Use IPv4

      // Compression
      compressors: ['zlib'],

      // Heartbeat settings
      heartbeatFrequencyMS: 10000,
      maxIdleTimeMS: 30000,

      // Write concern
      w: 'majority',
      wtimeoutMS: 5000,

      // Read preference
      readPreference: 'primaryPreferred'
    };

    console.log('Attempting to connect to MongoDB...');

    const client = new MongoClient(baseUri, options);

    // Connect with timeout
    await client.connect();

    console.log('MongoDB connected successfully');

    const close = async () => {
      try {
        await client.close();
        console.log('MongoDB connection closed');
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
      }
    };

    // Return client and close function
    return [client, close];

  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

// Job Applications Database Operations
export const jobApplicationsDb = {
  // Generate a unique short ID
  generateShortId: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Create a new job application record
  createJobApplication: async (companyName, jobApplicationId = null) => {
    let client = null;
    try {
      console.log('Creating job application for:', companyName);

      // Connect to MongoDB with timeout
      const [clientResult, close] = await mongodb();
      client = clientResult;

      // Get database and collection
      const db = client.db('portfolio');
      const collection = db.collection('job_applications');

      // Generate unique short ID
      const shortId = jobApplicationsDb.generateShortId();
      const jobApplication = {
        shortId,
        companyName,
        jobApplicationId,
        createdAt: new Date(),
        views: [],
        viewCount: 0
      };

      console.log('Inserting job application:', { shortId, companyName });

      // Insert document with timeout
      const result = await Promise.race([
        collection.insertOne(jobApplication),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Database insert timeout')), 8000)
        )
      ]);

      console.log('Job application created successfully:', result.insertedId);

      // Close connection
      await close();

      return {
        success: true,
        jobApplication: { ...jobApplication, _id: result.insertedId }
      };

    } catch (error) {
      console.error('Error creating job application:', error);

      // Ensure connection is closed on error
      if (client) {
        try {
          await client.close();
        } catch (closeError) {
          console.error('Error closing connection after failure:', closeError);
        }
      }

      return { success: false, error: error.message };
    }
  },

  // Get job application by short ID
  getJobApplication: async (shortId) => {
    let client = null;
    try {
      console.log('Getting job application for shortId:', shortId);

      // Connect to MongoDB
      const [clientResult, close] = await mongodb();
      client = clientResult;

      // Get database and collection
      const db = client.db('portfolio');
      const collection = db.collection('job_applications');

      // Find document with timeout
      const jobApplication = await Promise.race([
        collection.findOne({ shortId }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Database find timeout')), 8000)
        )
      ]);

      console.log('Job application lookup result:', jobApplication ? 'found' : 'not found');

      // Close connection
      await close();

      if (!jobApplication) {
        return { success: false, error: 'Job application not found' };
      }

      return { success: true, jobApplication };

    } catch (error) {
      console.error('Error getting job application:', error);

      // Ensure connection is closed on error
      if (client) {
        try {
          await client.close();
        } catch (closeError) {
          console.error('Error closing connection after failure:', closeError);
        }
      }

      return { success: false, error: error.message };
    }
  },

  // Track a view for a job application
  trackView: async (shortId, additionalData = {}) => {
    let client = null;
    try {
      console.log('Tracking view for shortId:', shortId);

      // Connect to MongoDB
      const [clientResult, close] = await mongodb();
      client = clientResult;

      // Get database and collection
      const db = client.db('portfolio');
      const collection = db.collection('job_applications');

      const viewTimestamp = new Date();
      const viewData = {
        timestamp: viewTimestamp,
        userAgent: additionalData.userAgent || null,
        ip: additionalData.ip || null,
        referrer: additionalData.referrer || null
      };

      console.log('Updating view count for:', shortId);

      // Update document with timeout
      const updateResult = await Promise.race([
        collection.updateOne(
          { shortId },
          {
            $push: { views: viewData },
            $inc: { viewCount: 1 },
            $set: { lastViewedAt: viewTimestamp }
          }
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Database update timeout')), 8000)
        )
      ]);

      if (updateResult.matchedCount === 0) {
        await close();
        return { success: false, error: 'Job application not found' };
      }

      console.log('View count updated, fetching updated document');

      // Get updated job application data with timeout
      const jobApplication = await Promise.race([
        collection.findOne({ shortId }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Database find timeout')), 8000)
        )
      ]);

      console.log('View tracked successfully for:', shortId);

      // Close connection
      await close();

      return { success: true, jobApplication };

    } catch (error) {
      console.error('Error tracking view:', error);

      // Ensure connection is closed on error
      if (client) {
        try {
          await client.close();
        } catch (closeError) {
          console.error('Error closing connection after failure:', closeError);
        }
      }

      return { success: false, error: error.message };
    }
  },

  // Get all job applications (for admin purposes)
  getAllJobApplications: async () => {
    let client = null;
    try {
      console.log('Getting all job applications');

      // Connect to MongoDB
      const [clientResult, close] = await mongodb();
      client = clientResult;

      // Get database and collection
      const db = client.db('portfolio');
      const collection = db.collection('job_applications');

      // Find all documents with timeout
      const jobApplications = await Promise.race([
        collection.find({}).sort({ createdAt: -1 }).toArray(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Database query timeout')), 8000)
        )
      ]);

      console.log(`Found ${jobApplications.length} job applications`);

      // Close connection
      await close();

      return { success: true, jobApplications };

    } catch (error) {
      console.error('Error getting job applications:', error);

      // Ensure connection is closed on error
      if (client) {
        try {
          await client.close();
        } catch (closeError) {
          console.error('Error closing connection after failure:', closeError);
        }
      }

      return { success: false, error: error.message };
    }
  }
};

export default mongodb;
