import React from "react";
import Avatar from "../../assets/avatar-svgrepo-com.svg";
import Input from "../../components/Input/Index";

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
        <div className="w-[50%] border border-black h-screen flex flex-col items-center bg-white">
          <div className="h-[80px] w-[75%] bg-secondary my-10 rounded-full flex items-center px-14 shadow-lg ">
            <div className="cursor-pointer">
              <img src={Avatar} width={50} height={50} alt="" />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg font-semibold">alex</h3>
              <p className="text-sm font-light text-gray-600">online</p>
            </div>
            <div className="cursor-pointer"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-phone-outgoing"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="black"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              <path d="M15 9l5 -5" />
              <path d="M16 4l4 0l0 4" />
            </svg>
          </div>
          <div className="h-[75%]  w-full overflow-y-scroll shadow-sm">
            <div className=" p-14 ">
              <div className="p-4 max-w-[40%] mb-6 bg-secondary rounded-b-xl rounded-tr-xl">
                Lorem ipsum dolor sit amet.
              </div>
              <div className="p-4 max-w-[40%] mb-6  bg-primary rounded-b-xl rounded-tl-xl ml-auto text-white">
                Lorem ipsum dolor sit amet.
              </div>
              <div className="p-4 max-w-[40%] mb-6 bg-secondary rounded-b-xl rounded-tr-xl">
                Lorem ipsum dolor sit amet.
              </div>
              <div className="p-4 max-w-[40%] mb-6  bg-primary rounded-b-xl rounded-tl-xl ml-auto text-white">
                Lorem ipsum dolor sit amet.
              </div>
              <div className="p-4 max-w-[40%] mb-6 bg-secondary rounded-b-xl rounded-tr-xl">
                Lorem ipsum dolor sit amet.
              </div>
              <div className="p-4 max-w-[40%] mb-6  bg-primary rounded-b-xl rounded-tl-xl ml-auto text-white">
                Lorem ipsum dolor sit amet.
              </div>
            </div>
          </div>
          <div className="p-14 w-full flex items-center">
            <Input
              placeholder="type a message"
              className="w-[75%]"
              inputClassName="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
            />
            <div className="ml-4 p-2 rounded-full bg-light cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-send"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 14l11 -11" />
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </div>
            <div className="ml-4 p-2 rounded-full bg-light cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-plus"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-[25%] bg-light border border-black h-screen"></div>
      </div>
    </>
  );
};

export default DashBoard;
