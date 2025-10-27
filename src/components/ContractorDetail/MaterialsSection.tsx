import { IMaterial } from "../../types/contractor.type";

type TProps = {
  materials: IMaterial[];
};

const MaterialsSection = ({ materials }: TProps) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-[#262626] mb-4">
        Materials & Pricing
      </h2>

      <div className="space-y-3">
        {materials?.length > 0 ? (
          <>
            {materials?.map((material) => (
              <div
                key={material._id}
                className="border rounded-lg p-6 transition-colors border-[#E5E5E5] bg-[#FFFFFF] hover:bg-[#F8F8F8]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#262626]">
                      {material.name}
                    </h3>
                    <p className="text-sm text-[#808080]">
                      Per {material.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#262626]">
                      ${material.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : <h1>There is no material</h1>

        }
      </div>
    </section>
  );
};

export default MaterialsSection;
