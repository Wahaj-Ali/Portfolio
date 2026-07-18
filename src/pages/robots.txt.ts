import { GetServerSideProps } from "next";
import { generateRobotsTxt } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/site";

function RobotsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const origin = getSiteOrigin(
    req.headers.host ? `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}` : undefined
  );

  res.setHeader("Content-Type", "text/plain");
  res.write(generateRobotsTxt(origin));
  res.end();

  return { props: {} };
};

export default RobotsTxt;
