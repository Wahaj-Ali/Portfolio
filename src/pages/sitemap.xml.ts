import { GetServerSideProps } from "next";
import { generateSitemapXml } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/site";

function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const origin = getSiteOrigin(
    req.headers.host ? `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}` : undefined
  );

  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemapXml(origin));
  res.end();

  return { props: {} };
};

export default SiteMap;
