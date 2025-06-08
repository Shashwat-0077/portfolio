import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
    return <h1 className="mb-8 text-3xl font-bold">{children}</h1>;
};

export default Heading;
