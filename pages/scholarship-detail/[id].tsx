import Layout from "@/components/layout";
import Layout2 from "@/components/layout2";
import ScholarshipDetailInner from "./components/scholarshipInner";

export default function scholarshipDetail() {
  const authorize = true;
  if (authorize) {
    return (
      <Layout2>
        <ScholarshipDetailInner />
      </Layout2>
    );
  }
  return (
    <Layout>
      <ScholarshipDetailInner />
    </Layout>
  );
}
