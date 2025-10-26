import { Download, FileText } from "lucide-react";

type TProps = {
    certificates: string[]
}

const CertificatesSection = ({ certificates }: TProps) => {
  return (
    <section className="sticky top-4">
      <h2 className="text-2xl font-bold text-foreground mb-4">Certificates</h2>
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="space-y-3">
          {certificates?.map((cert, index) => (
            <a
              key={index}
              href={cert}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm font-medium text-foreground">Certificate {index + 1}</span>
              </div>
              <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}


export default CertificatesSection;