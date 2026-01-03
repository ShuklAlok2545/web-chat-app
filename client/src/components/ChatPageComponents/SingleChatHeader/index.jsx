import { IoMdMore } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import "./SingleChatHeader.css";
import { useAppStore } from "../../../store";
import { GET_GROUP_MEMBERS_ROUTE } from "../../../utils/constants";
import { useEffect } from "react";
import { apiClient } from "../../../lib/api-client";
import { HiUserGroup } from "react-icons/hi";
import {useRef, useState } from "react";

import {GET_USER_INFO_ROUTE }from "../../../utils/constants";
import { deleteMsgBothSide } from "../../../../../server/controllers/DeleteMessagesController";



const SingleChatHeader = () => {
  

  const {
    selectedChatData,
    selectedChatType,
    setActiveIcon,
    selectedChatMembers,
    setSelectedChatMembers,
    userInfo,
    setContactOrGroupProfile,
    setSelectedChatMessages,
    closeChat,
  } = useAppStore();


  const [moremenu, setMoremenu] = useState(false);
  const [dltPopUp, setdltPopUp] = useState(false);

  const menuRef = useRef(null);
  const dltRef = useRef(null);


  const DeleteBothSide = async () => {
    try{
      console.log('dlt both side')
      closeChat();
      setSelectedChatMessages([]);
      setdltPopUp(false);
      setMoremenu(false)

      if(selectedChatType === 'group'){
        console.log(selectedChatData)
        await apiClient.post(`/api/delete/msg-both-side/`,{chatType:selectedChatType,selectedChatData})
        setSelectedChatMembers([]);
      }
      if(selectedChatType === 'contact'){
        const userData = {...selectedChatData,sender:userInfo.id}
        // console.log(userData)
        await apiClient.post(`/api/delete/msg-both-side/`,{chatType:selectedChatType,userData})
      }
      //closeChat();
    }
    catch(e){
      console.log(e)
    }
  }
  

  const openMenuMore = (e) => {
    e.stopPropagation();
    setMoremenu((prev) => !prev);
    setdltPopUp(false); // close delete popup when toggling menu
  };
  
  const deletePopUp = (e) => {
    e.stopPropagation();
    setdltPopUp(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMoremenu(false);
        setdltPopUp(false);
      }
  
      if (
        dltRef.current &&
        !dltRef.current.contains(event.target)
      ) {
        setdltPopUp(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);
  
  

  
  useEffect(() => {
    const getGroupMembers = async () => {
      try {
        const response = await apiClient.get(
          `${GET_GROUP_MEMBERS_ROUTE}/${selectedChatData._id}`,
          { withCredentials: true }
        );

        if (response.data.members) {
          setSelectedChatMembers(response.data.members);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "group") {
        getGroupMembers();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMembers]);


  return (
    <div className="single-chat-header">
      <div className="user">
        <div
          className="avatar"
          onClick={() => {
            setContactOrGroupProfile(selectedChatData);
            setActiveIcon("contactOrGroupProfile");
          }}
        >
          {selectedChatData.name ? (
            // <img src="./avatar.png" className="img non-present" />
            <div className="img group-img">
              <HiUserGroup />
            </div>
          ) : selectedChatData.image ? (
            <img src={selectedChatData.image} alt="avatar" className="img" />
          ) : (
            <div className="img non-present">
              {selectedChatData.firstName && selectedChatData.lastName
                ? `${selectedChatData.firstName.charAt(
                    0
                  )} ${selectedChatData.lastName.charAt(0)}`
                : selectedChatData.firstName
                ? selectedChatData.firstName.charAt(0)
                : selectedChatData.lastName
                ? selectedChatData.lastName.charAt(0)
                : selectedChatData.email.charAt(0)}
            </div>
          )}
        </div>
        <div
          className="info"
          onClick={() => {
            setContactOrGroupProfile(selectedChatData);
            setActiveIcon("contactOrGroupProfile");
          }}
        >
          <div>
            {selectedChatType === "group" && selectedChatData.name}
            {selectedChatType === "contact" &&
              (selectedChatData.firstName && selectedChatData.lastName
                ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                : selectedChatData.firstName
                ? selectedChatData.firstName
                : selectedChatData.lastName
                ? selectedChatData.lastName
                : selectedChatData.email)}
          </div>
          {selectedChatType === "group" ? (
            <div className="group-members">
              {selectedChatMembers.map((member, index) => (
                <span key={member.id} className="member">
                  {member.id === userInfo.id
                    ? "You"
                    : `${member.firstName} ${member.lastName}`}
                  {index < selectedChatMembers.length - 1 && `,\u00A0`}
                </span>
              ))}
            </div>
          ) : (
            <div>Last Seen</div>
          )}
        </div>
        <div></div>
      </div>
      <div className="icons">
        <div className="icon currently-disabled-icon">
          <IoIosSearch />
        </div>

        <div className="icon" ref={menuRef}>
          <IoMdMore onClick={openMenuMore} />

          {moremenu && (
            <div className="more-menu"  ref = {dltRef} onClick={deletePopUp}>
              <div className="more-menu-item">Clear chat</div>
            </div>
          )}
        
        </div>

        {dltPopUp && (
          <div className="dlt-popup" >
           <ul   onClick={(e) => e.stopPropagation()}>
            <li onClick={DeleteBothSide}>{(selectedChatType === 'group')?'delete group chats from evryone':'delete chats from evryone'}</li>
            {/* <li onClick={DeleteForMySide}>Delete only for me</li> */}
           </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default SingleChatHeader;
