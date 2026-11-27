import DetailViewPage from "./view";

interface DetailArticleProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: DetailArticleProps) {
  const { id } = await params;

  return <DetailViewPage id={id} />;
}
