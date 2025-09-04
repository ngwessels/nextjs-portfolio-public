import { backendValidation } from "nextjs-seo-manager";
import SEOInit from "nextjs-seo-manager/init";

SEOInit({
  projectId: process.env.NEXT_PUBLIC_SEO_PROJECT_ID,
  projectKey: process.env.NEXT_PUBLIC_SEO_PROJECT_KEY,
  secretKey: process.env.NEXT_PUBLIC_SEO_PROJECT_SECRET_KEY
});

export default async (req, res) => {
  const start = Date.now();
  const response = await backendValidation(req.body);
  if (
    req?.body?.type === "update-seo" ||
    req?.body?.type === "insert-seo" ||
    req?.body?.type === "insertorupdate-seo"
  ) {
    const a = Object.keys(response?.results || []).map(async (idx) => {
      try {
        const item = response?.results[idx];
        await res.revalidate(item?.path || "/");
      } catch (err) {}

      return;
    });
    await Promise.all(a);
  }
  return res.status(200).send({ success: true });
};
