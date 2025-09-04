//Firebase
import firebase from "./firebaseAdmin";

//Axios
import axios from "axios";

const projects = () => {
  return new Promise((resolve, reject) => {
    const object = {
      method: "get",
      url: "https://api.github.com/users/ngwessels/repos",
    };
    axios(object)
      .then((res) => {
        let projects = {},
          languages = {},
          languageLength = 0;
        if (res?.data) {
          for (let x in res.data) {
            const project = res.data[x];
            projects[project.id] = project;
            if (languages[project.language]) {
              languages[project.language].push(project.id);
            } else {
              languages[project.language] = [project.id];
              languageLength++;
            }
          }
          const action = {
            type: "GITHUB",
            results: {
              projects,
              languages,
              level1Height: 40 * languageLength,
              load: true,
            },
          };
          return resolve([action]);
        }
      })
      .catch((err) => {
        console.error(err);
        return resolve([]);
      });
  });
};


// Cache configuration for Vercel serverless functions
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds (optimal for serverless)

// Simple in-memory cache (resets on cold start)
// Note: Vercel serverless functions may cold start and lose cache
let memoryCache = null;
let cacheTimestamp = null;

// Check if cache is still valid
function isCacheValid() {
  if (!memoryCache || !cacheTimestamp) {
    return false;
  }
  return (Date.now() - cacheTimestamp) < CACHE_DURATION;
}

function getContributionLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

function generateMockContributions() {
  const contributions = [];
  const today = new Date();

  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const count = Math.floor(Math.random() * 11);
    contributions.push({
      date: date.toISOString().split('T')[0],
      count: count,
      level: getContributionLevel(count)
    });
  }

  return contributions;
}

const getContributions = async (username = 'ngwessels') => {
  return new Promise(async (resolve, reject) => {
    // Check cache first
    if (isCacheValid()) {
      console.log('Serving cached GitHub contributions data');
      return resolve({
        ...memoryCache,
        cached: true,
        cacheAge: Math.floor((Date.now() - cacheTimestamp) / 1000)
      });
    }

    try {
      // GitHub GraphQL API query for contributions
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const response = await axios.post(
        'https://api.github.com/graphql',
        {
          query,
          variables: { username }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data.data;
      const contributions = [];

      if (data?.user?.contributionsCollection?.contributionCalendar) {
        const calendar = data.user.contributionsCollection.contributionCalendar;

        // Flatten the weeks and days into a simple array
        calendar.weeks.forEach(week => {
          week.contributionDays.forEach(day => {
            contributions.push({
              date: day.date,
              count: day.contributionCount,
              level: getContributionLevel(day.contributionCount)
            });
          });
        });
      }

      const responseData = {
        contributions,
        totalContributions: data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0
      };

      // Cache the successful response in memory
      memoryCache = responseData;
      cacheTimestamp = Date.now();

      console.log('Fetched fresh GitHub contributions data and cached it');
      resolve({
        ...responseData,
        cached: false
      });

    } catch (error) {
      console.error('GitHub API Error:', error.response?.data || error.message);

      // Return mock data as fallback and cache it
      const mockContributions = generateMockContributions();
      const fallbackData = {
        contributions: mockContributions,
        totalContributions: mockContributions.reduce((sum, day) => sum + day.count, 0)
      };

      // Cache the fallback data in memory
      memoryCache = fallbackData;
      cacheTimestamp = Date.now();

      console.log('GitHub API failed, serving and caching fallback mock data');
      resolve({
        ...fallbackData,
        cached: false,
        fallback: true
      });
    }
  });
};

const clearContributionsCache = () => {
  memoryCache = null;
  cacheTimestamp = null;
  console.log('GitHub contributions cache cleared');
};

export { projects, getContributions, clearContributionsCache };
