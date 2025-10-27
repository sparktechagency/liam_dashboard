type TProps = {
    skills: string[];
};

const SkillsSection = ({ skills }: TProps) => {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-[#262626] mb-4">Skills:</h2>
            {skills?.length > 0 ? (
                <>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 text-sm font-medium rounded-full transition-colors bg-[#DDE6FF] text-[#003399] hover:bg-[#C8D6FF]"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </>
            ) : <h1 className="bg-[#DDE6FF] p-1">There is no skills</h1>
            }
        </section>
    );
};

export default SkillsSection;
