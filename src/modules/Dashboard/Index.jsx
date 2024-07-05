import React, { useRef, useEffect, useState } from "react";
import Avatar from "../../assets/avatar-svgrepo-com.svg";
import Input from "../../components/Input/Index";
import { io } from "socket.io-client";

const DashBoard = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState({ messages: [] });
  const [inputmessage, setInputmessage] = useState("");
  const [people, setPeople] = useState([]);

  console.log(messages, "message");
  // const socketRef = useRef(null);
  const socket = io("http://localhost:8080");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("addUser", user?.id);
    });

    // socketRef.current = io("http://localhost:8080");
    // const socket = socketRef.current;
    // socket.emit("addUser", user?.id);

    socket.on("getUsers", (users) => {
      console.log("Received message:", users);
      console.log("active users", users);
    });

    socket.on("getMessage", (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message, id: data.id },
        ],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversation = async () => {
      const res = await fetch(
        `http://localhost:8000/api/conversation/${loggedInUser?.id}`
      );
      const resData = await res.json();

      setConversation(resData);
    };

    fetchConversation();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:8000/api/users/${user?.id}`);
      const resData = await res.json();
      setPeople(resData);
    };

    fetchUsers();
  }, [user]);

  const fetchMessages = async (conversationId, reciever) => {
    const res = await fetch(
      `http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&recieverId=${reciever?.recieverId}`
    );
    const resData = await res.json();
    setMessages({ messages: resData, reciever: reciever, conversationId });
  };

  const sendMessage = async () => {
    if (inputmessage.trim() === "") return;
    console.log("resId", messages?.reciever?._id);

    // const socket = socketRef.current;
    socket?.emit("sendMessage", {
      conversationId: messages?.conversationId,
      senderId: user?.id,
      message: inputmessage,
      recieverId: messages?.reciever?._id,
    });

    setInputmessage("");

    await fetch("http://localhost:8000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message: inputmessage,
        recieverId: messages?.reciever?.recieverId,
      }),
    });
  };

  return (
    <>
      <div className="w-screen flex">
        <div className="w-[25%]  h-screen bg-secondary">
          <div className="justify-start items-center flex ml-10 my-4">
            <div className="border border-primary p-[8px] rounded-full">
              <img src={Avatar} width={50} height={50} alt="" />
            </div>
            <div className="ml-8">
              <h3 className="text-xl capitalize">{user?.fullname}</h3>
              <p className="text-md">My Account</p>
            </div>
          </div>
          <hr />
          <div className="ml-4 mt-5">
            <div className="text-primary text-lg">Messages</div>
            <div>
              {conversation.length > 0 ? (
                conversation.map(({ conversationId, user }) => {
                  // console.log(conversationId, "covo");
                  return (
                    <>
                      <div className="flex items-center py-4 border-b border-b-gray-300">
                        <div
                          className="cursor-pointer flex items-center "
                          onClick={() => {
                            fetchMessages(conversationId, user);
                          }}
                        >
                          <div className="border border-primary p-[8px] rounded-full">
                            <img src={Avatar} width={40} height={40} alt="" />
                          </div>
                          <div className="ml-6">
                            <h3 className="text-lg font-semibold">
                              {user?.fullname}
                            </h3>
                            <p className="text-sm font-light text-gray-600">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="text-center text-md font-semibold mt-12 my-auto">
                  No Conversations
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-[50%] h-screen flex flex-col items-center bg-white">
          {messages?.reciever?.fullname && (
            <div className="h-[80px] w-[75%] bg-secondary my-5 rounded-full flex items-center px-7  shadow-lg ">
              <div className="cursor-pointer">
                <img src={Avatar} width={50} height={50} alt="" />
              </div>
              <div className="ml-6 mr-auto">
                <h3 className="text-lg font-semibold">
                  {messages?.reciever?.fullname}
                </h3>
                <p className="text-sm font-light text-gray-600">
                  {messages?.reciever?.email}
                </p>
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
          )}
          <div className="h-[75%]  w-full overflow-y-scroll shadow-sm">
            <div className=" p-14 ">
              {messages?.messages?.length > 0 ? (
                messages?.messages?.map(({ message, user: { _id } = {} }) => {
                  return (
                    <div
                      className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                        _id === user?.id
                          ? "bg-primary text-white rounded-tl-xl ml-auto"
                          : "bg-secondary rounded-tr-xl"
                      }`}
                    >
                      {message}
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-md font-semibold mt-24">
                  No Messages or No Conversation
                </div>
              )}
            </div>
          </div>
          {messages?.reciever?.fullname && (
            <div className="p-5 w-full flex items-center">
              <Input
                placeholder="type a message"
                value={inputmessage}
                onchange={(e) => setInputmessage(e.target.value)}
                className="w-[75%]"
                inputClassName="p-4 mb-0 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
              />
              <div
                className={`ml-4 p-2 rounded-full bg-light cursor-pointer ${
                  !inputmessage && "pointer-events-none"
                }`}
                onClick={(e) => {
                  sendMessage(e);
                }}
              >
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
              <div
                className={`ml-4 p-2 rounded-full bg-light cursor-pointer ${
                  !inputmessage && "pointer-events-none"
                }`}
              >
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
          )}
        </div>
        <div className="w-[25%] bg-light border border-black h-screen">
          <div>people</div>
          <div>
            {people.length > 0 ? (
              people.map(({ userId, user }) => {
                return (
                  <>
                    <div className="flex items-center py-4 border-b border-b-gray-300">
                      <div
                        className="cursor-pointer flex items-center "
                        onClick={() => {
                          fetchMessages("new", user);
                        }}
                      >
                        <div className="border border-primary p-[8px] rounded-full">
                          <img src={Avatar} width={40} height={40} alt="" />
                        </div>
                        <div className="ml-6">
                          <h3 className="text-lg font-semibold">
                            {user?.fullname}
                          </h3>
                          <p className="text-sm font-light text-gray-600">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="text-center text-md font-semibold mt-12 my-auto">
                No Conversations
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
