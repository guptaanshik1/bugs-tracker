import dynamic from "next/dynamic";
import IssueFormSkeletons from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeletons />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
