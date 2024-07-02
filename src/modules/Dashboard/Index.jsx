import React from "react";
import Avatar from "../../assets/avatar-svgrepo-com.svg";

const DashBoard = () => {
  const contacts = [
    {
      name: "vick",
      status: "Available",
      img: Avatar,
    },
    {
      name: "mary",
      status: "Available",
      img: Avatar,
    },
    {
      name: "john",
      status: "Available",
      img: Avatar,
    },
    {
      name: "root",
      status: "Available",
      img: Avatar,
    },
    {
      name: "tim",
      status: "Available",
      img: Avatar,
    },
    {
      name: "perry",
      status: "Available",
      img: Avatar,
    },
  ];
  return (
    <>
      <div className="w-screen flex">
        <div className="w-[25%]  h-screen bg-secondary">
          <div className="justify-center items-center flex my-8">
            <div className="border border-primary p-[8px] rounded-full">
              <img src={Avatar} width={50} height={50} alt="" />
            </div>
            <div className="ml-8">
              <h3 className="text-2xl">tutorial dev</h3>
              <p className="text-lg">My Account</p>
            </div>
          </div>
          <hr />
          <div className="ml-8 mt-10">
            <div className="text-primary text-lg">Messages</div>
            <div>
              {contacts.map(({ name, img, status }) => {
                return (
                  <>
                    <div className="flex items-center py-8 border-b border-b-gray-300">
                      <div className="cursor-pointer flex items-center">
                        <div className="border border-primary p-[8px] rounded-full">
                          <img src={img} width={40} height={40} alt="" />
                        </div>
                        <div className="ml-6">
                          <h3 className="text-lg font-semibold">{name}</h3>
                          <p className="text-sm font-light text-gray-600">
                            {status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-[50%] border border-black h-screen"></div>
        <div className="w-[25%] border border-black h-screen"></div>
      </div>
    </>
  );
};

export default DashBoard;
