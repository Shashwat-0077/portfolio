import React from "react";

const Circle = () => {
    return (
        <div className="w-hull z-10 grid h-full place-content-center">
            <div className="circle bg-primary size-16 rounded-full"></div>
        </div>
    );
};

const Empty = () => {
    return <div className="h-full w-full">&nbsp;</div>;
};

const SecondaryContent = () => {
    return (
        <div className="rounded-lg p-8 text-right">
            <h1 className="text-primary text-3xl">
                Secondary School (Class 10)
            </h1>
            <p className="text-muted">
                <span className="block">St. Vivekanand Millennium School</span>
                <span className="block">
                    HMT Township, Pinjore Panchkula, Haryana, India
                </span>
                <span className="block">2018 - 2019</span>
                <span className="block">Percentage : 82%</span>
            </p>
        </div>
    );
};

const SeniorSecondaryContent = () => {
    return (
        <div className="rounded-lg p-8">
            <h1 className="text-primary text-3xl">
                Senior Secondary (Class 12)
            </h1>
            <p className="text-muted">
                <span className="block">
                    Pandit Mohan Lal Sanatan Dharam school
                </span>
                <span className="block">Sector 32-C, Chandigarh, India</span>
                <span className="block">2020 - 2021</span>
                <span className="block">Percentage : 80.16%</span>
            </p>
        </div>
    );
};

const BachelorsContent = () => {
    return (
        <div className="rounded-lg p-8 text-right">
            <h1 className="text-primary text-3xl">
                BCA - Bachelor of Computer Applications
            </h1>
            <p className="text-muted">
                <span className="block">Vellore Institute of Technology</span>
                <span className="block">Vellore, Tamil Nadu, India</span>
                <span className="block">2021 - 2024</span>
                <span className="block">CGPA : 9.05</span>
            </p>
        </div>
    );
};

const MasterContent = () => {
    return (
        <div className="rounded-lg p-8">
            <h1 className="text-primary text-3xl">
                MCA - Master of Computer Applications
            </h1>
            <p className="text-muted">
                <span className="block">Vellore Institute of Technology</span>
                <span className="block">Vellore, Tamil Nadu, India</span>
                <span className="block">2021 - 2024</span>
                <span className="block">CGPA : 8.88 (current)</span>
            </p>
        </div>
    );
};

const EducationSection = () => {
    return (
        <section className="py-32">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
                Education
            </h2>
            <div className="relative grid grid-cols-[1fr_70px_1fr] gap-y-40">
                <div className="bar bg-primary/10 absolute top-[6%] bottom-[6%] left-1/2 w-2 -translate-x-1/2">
                    &nbsp;
                </div>
                <SecondaryContent />
                <Circle />
                <Empty />
                <Empty />
                <Circle />
                <SeniorSecondaryContent />
                <BachelorsContent />
                <Circle />
                <Empty />
                <Empty />
                <Circle />
                <MasterContent />
            </div>
        </section>
    );
};

export default EducationSection;
