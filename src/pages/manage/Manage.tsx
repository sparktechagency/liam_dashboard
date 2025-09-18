import { useState } from "react";
import Category from "../../components/PagesComponents/Manage/Category";
import Materials from "../../components/PagesComponents/Manage/Materials";
import AddCategoryModal from "../../components/modal/category/AddCategoryModal";
import SubCategory from "../../components/PagesComponents/Manage/SubCategory";
import Questions from "../../components/PagesComponents/Manage/Questions";
import AddSubCategoryModal from "../../components/modal/SubCategory/AddSubCategoryModal";
import AddQuestionModal from "../../components/modal/question/AddQuestionModal";
import AddMaterialsModal from "../../components/modal/materials/AddMaterialsModal";

type Tab = "category" | "sub category" | "questions" | "materials";

const Manage = () => {
    const tabItems = ["category", "sub category", "questions", "materials"]
    const [activeTab, setActiveTab] = useState<Tab>("category");


    return (
        <div className=" bg-white rounded-md px-3 py-4 min-h-screen">
            <div className=" mb-5">
              <h2 className="text-md md:text-xl font-semibold ">Manage</h2>
            </div>
            <div className=" flex justify-between gap-4">
                <div className="flex gap-4">
                    {tabItems?.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(item as Tab)}
                            className={`cursor-pointer capitalize px-10 py-2 rounded-md  ${activeTab === item
                                ? "text-primary bg-primaryColor text-white"
                                : " border border-primaryColor"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <div>
                    {activeTab === "category" && <AddCategoryModal/>}
                    {activeTab === "materials" && <AddMaterialsModal/>}
                    {activeTab === "sub category" && <AddSubCategoryModal/>}
                    {activeTab === "questions" && <AddQuestionModal/>}
                </div>                
            </div>
            {activeTab === "category" && <Category />}
            {activeTab === "sub category" && <SubCategory />}
            {activeTab === "materials" && <Materials />}
            {activeTab === "questions" && <Questions />}
        </div>
    );
};

export default Manage;