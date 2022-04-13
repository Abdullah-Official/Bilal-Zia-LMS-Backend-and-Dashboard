import React from "react";

const HeroSection = () => {
  return (
    <div>
      <div
        className="jumbotron card card-image"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fG9ubGluZSUyMGxlYXJuaW5nfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white text-center py-3 px-2">
          <div>
            <h5 className="title h5-responsive  font-bold">
              Learning Management System
            </h5>
            <h2 className="card-title h1-responsive pt-3 mb-5 font-bold">
              <strong>Physics By Bilal Zia</strong>
            </h2>
            <p className="mx-auto mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
              fugiat, laboriosam, voluptatem, optio vero odio nam sit officia
              accusamus minus error nisi architecto nulla ipsum dignissimos.
              Odit sed qui, dolorum!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
