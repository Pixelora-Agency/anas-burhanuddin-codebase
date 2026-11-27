import Error400 from "../400";
import Error401 from "../401";
import Error403 from "../403";
import Error404 from "../404";
import Error429 from "../429";
import Error500 from "../500";

interface DetailArticleProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: DetailArticleProps) {
  const { id } = await params;

  if (id === "500") {
    return <Error500 />;
  }
  if (id === "400") {
    return <Error400 />;
  }
  if (id === "401") {
    return <Error401 />;
  }
  if (id === "403") {
    return <Error403 />;
  }
  if (id === "429") {
    return <Error429 />;
  }
  return <Error404 />;
}
