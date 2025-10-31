import TopicWrapper from "@/components/DetailTopic/TopicWrapper";
import AsideWrapper from "@/components/DetailTopic/AsideWrapper";
import NavbarTopic from "@/components/DetailTopic/NavbarTopic";
import { response } from "@/constants/listMateri";

export default function DetailTopic() {
  return (
    <div className="flex flex-col gap-3 lg:gap-12 px-6">
      <NavbarTopic title={response[0].title} />
      <div className="flex gap-6 px-2 material">
        <TopicWrapper className="material">
          {response.map((item, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          ))}
        </TopicWrapper>

        <AsideWrapper>
          {/* isinya nanti daftar isi, tapi buat test bisa taro placeholder dulu */}
          <div></div>
        </AsideWrapper>
      </div>
    </div>
  );
}
