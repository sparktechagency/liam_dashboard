import { Download, FileText } from "lucide-react";

type TProps = {
  certificates: string[];
};

const CertificatesSection = ({ certificates }: TProps) => {
  return (
    <section className="sticky top-4">
      <h2 className="text-2xl font-bold mb-4 text-[#262626]">Certificates</h2>

      <div className="border border-[#E5E5E5] rounded-lg p-6 bg-[#FFFFFF]">
        <div className="space-y-3">
          {certificates?.length > 0 ? (
            <>
              {
                certificates?.map((cert, index) => (
                  <a
                    key={index}
                    href={cert}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-[#F0F0F0] hover:bg-[#E8E8E8] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#808080] group-hover:text-[#262626] transition-colors" />
                      <span className="text-sm font-medium text-[#262626]">
                        Certificate {index + 1}
                      </span>
                    </div>
                    <Download className="w-4 h-4 text-[#808080] group-hover:text-[#262626] transition-colors" />
                  </a>
                ))
              }
            </>
          ) :
            <h1> There is no certificates</h1>
          }
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
