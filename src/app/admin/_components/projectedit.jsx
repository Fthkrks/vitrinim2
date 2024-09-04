import { TwicPicture } from "@twicpics/components/react";
import axios from "axios";
import { Camera, Grip, Image, Link2, SquareStack, Trash } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { APP_URL } from "../../../config";
import toast from "react-hot-toast";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebaseConfig";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PreviewUpdateContext } from "../../_context/PreviewUpdateContext";

function ProjectEdit({ startupDetails, refreshData }) {
  const timeoutIdRef = useRef(null);
  const {updatePreview, setUpdatePreview} = useContext(PreviewUpdateContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [startupDetailData, setStartupDetailData] = useState([]);

  useEffect(() => {
    startupDetails && setStartupDetailData(startupDetails);
    const handleClickOut = (e) => {
      const optionElements =
        document.getElementsByClassName("extra-container2");
      const optionArray = Array.from(optionElements); // HTMLCollection'ı diziye çevir
      const isClickOutside = optionArray.every(
        (optionElement) => !optionElement.contains(e.target)
      );

      if (isClickOutside) {
        setSelectedOption("");
      }
    };

    window.addEventListener("click", handleClickOut);
    return () => {
      window.removeEventListener("click", handleClickOut);
    };
  }, [startupDetails]);

  const onInputChange = (value, name, id) => {
    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(() => {
      axios
        .put(`${APP_URL}/startups`, { [name]: value, id })
        .then((res) => {
          toast.success("Kaydedildi!", { position: "top-right" });
          setUpdatePreview(updatePreview +1)
        })
        .catch((error) => {
          toast.error("Hata!", { position: "top-right" });
        });
    }, 1000);
  };

  const onDeleteStartup = async (id) => {
    Swal.fire({
      title: "Emin misin ?",
      text: "Silmek istediğinizden emin misiniz ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet sil !",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${APP_URL}/startups`, { params: { id } })
          .then((res) => {
            Swal.fire({
              title: "Silindi!",
              text: "Startup başarıyla silindi.",
              icon: "success",
            });
            refreshData();
            toast.success("Silme işlemi başarılı", { position: "top-right" });
            setUpdatePreview(updatePreview +1)
          })
          .catch((err) => {
            toast.error("Silme işlemi başarısız", { position: "top-right" });
          });
      }
    });
  };

  const handleFileUploadForStartup = (e, name, id) => {
    const file = e.target.files[0];
    const image = Date.now().toString() + "." + file.type.split("/")[1];
    const storageRef = ref(storage, image);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      axios
        .put(`${APP_URL}/startups`, { id, [name]: image })
        .then((res) => {
          toast.success("Kaydedildi!", { position: "top-right" });
          refreshData();
          setUpdatePreview(updatePreview +1)

        })
        .catch((error) => {
          toast.error("Hata!", { position: "top-right" });
        });
    });
  };

  const handleOnDragEnd = (res) => {
    const startupId = res.draggableId;

    if (!res.destination) return;
    const newList = Array.from(startupDetailData);
    const [reorderList] = newList.splice(res.source.index, 1);
    newList.splice(res.destination.index, 0, reorderList);
    setStartupDetailData(newList);
    const requests = [];
    for (let i = 0; i < newList.length; i++) {
      requests.push(
        axios.put(`${APP_URL}/startups`, {
          id: newList[i]._id,
          order: i,
        })
      );
    }
    Promise.all(requests)
      .then((res) => {
        toast.success("Kaydedildi!", { position: "top-right" });
        setUpdatePreview(updatePreview +1)

      })
      .catch((error) => {
        toast.error("Hata!", { position: "top-right" });
      });
  };

  return (
    <div className="mt-10">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {startupDetailData.map((startup, index) => (
                <Draggable
                  key={startup._id}
                  draggableId={startup._id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex gap-x-4 items-center p-3 rounded-lg bg-gray-800 mt-5 "
                    >
                      <div {...provided.dragHandleProps}>
                        <Grip />
                      </div>
                      <div className="flex flex-col gap-y-4 w-full">
                        <div className="flex items-center gap-3">
                          {startup?.logo ? (
                            <label htmlFor={"startup-file-input" + index}>
                              <TwicPicture
                                src={startup?.logo}
                                className="w-12 h-12 rounded-full cursor-pointer"
                              />
                            </label>
                          ) : (
                            <label
                              htmlFor={"startup-file-input" + index}
                              className="cursor-pointer"
                            >
                              <Camera className="p-3 h-12 w-12 bg-gray-500 rounded-full" />
                            </label>
                          )}
                          <input
                            type="file"
                            onChange={(e) =>
                              handleFileUploadForStartup(e, "logo", startup._id)
                            }
                            accept="image/*"
                            id={"startup-file-input" + index}
                            className="hidden"
                          />
                          <input
                            type="text"
                            placeholder="Startup ismi ?"
                            className="input input-bordered w-full"
                            defaultValue={startup?.name}
                            onChange={(e) =>
                              onInputChange(e.target.value, "name", startup._id)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Startup'un ne yapar?"
                          className="input w-full text-sm"
                          defaultValue={startup?.desc}
                          onChange={(e) =>
                            onInputChange(e.target.value, "desc", startup._id)
                          }
                        />
                        <div className="mt-6 extra-container2">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <Link2
                                className={`w-11 h-11 p-3 rounded-md cursor-pointer hover:bg-gray-600 transition-all ${
                                  selectedOption === "url" + index &&
                                  "bg-gray-600"
                                }`}
                                onClick={() => {
                                  setSelectedOption("url" + index);
                                }}
                              />
                              <SquareStack
                                className={`w-11 h-11 p-3 rounded-md cursor-pointer hover:bg-gray-600 transition-all ${
                                  selectedOption === "category" + index &&
                                  "bg-gray-600"
                                }`}
                                onClick={() => {
                                  setSelectedOption("category" + index);
                                }}
                              />
                              <Image
                                className={`w-11 h-11 p-3 rounded-md cursor-pointer hover:bg-gray-600 transition-all ${
                                  selectedOption === "banner" + index &&
                                  "bg-gray-600"
                                }`}
                                onClick={() => {
                                  setSelectedOption("banner" + index);
                                }}
                              />
                              <Trash
                                onClick={() => onDeleteStartup(startup?._id)}
                                className="w-11 h-11 p-3  rounded-md cursor-pointer hover:bg-red-500 hover:text-white transition-all"
                              />
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                defaultChecked={startup?.active}
                                onChange={(e) =>
                                  onInputChange(
                                    e.target.checked,
                                    "active",
                                    startup._id
                                  )
                                }
                                className="toggle toggle-primary"
                              />
                            </div>
                          </div>
                          <div className="mt-3">
                            {selectedOption === "url" + index && (
                              <label
                                className={`input input-bordered flex items-center gap-2 ${
                                  selectedOption !== "url" + index && "hidden"
                                }`}
                              >
                                <Link2 className="w-5 h-5" />
                                <input
                                  type="text"
                                  key={1}
                                  defaultValue={startup?.url}
                                  className="grow"
                                  placeholder="Url ?"
                                  onChange={(e) =>
                                    onInputChange(e, "url", startup._id)
                                  }
                                />
                              </label>
                            )}
                            {selectedOption === "category" + index && (
                              <label
                                className={` flex items-center gap-2 ${
                                  selectedOption !== "category" + index &&
                                  "hidden"
                                }`}
                              >
                                <SquareStack className="w-5 h-5" />
                                <select
                                  className="select select-bordered w-full "
                                  onChange={(e) =>
                                    onInputChange(
                                      e.target.value,
                                      "category",
                                      startup._id
                                    )
                                  }
                                >
                                  <option disabled selected>
                                    Seç birini
                                  </option>
                                  <option value="Yakay zeka">
                                    🤖 Yakay zeka
                                  </option>
                                  <option value="Eğitim">🎓 Eğitim</option>
                                  <option value="Sosyal Medya">
                                    {" "}
                                    🌍 Sosyal Medya
                                  </option>
                                  <option value="Tasarım">🎨 Tasarım</option>
                                  <option value="E ticaret">
                                    🛒 E ticaret
                                  </option>
                                  <option value="Analiz">📉 Analiz</option>
                                  <option value="Pazarlama">
                                    📢 Pazarlama
                                  </option>
                                  <option value="Fintek">💸 Fintek</option>
                                  <option value="Ulaşım">🚗 Ulaşım</option>
                                  <option value="Diğer">,🚀 Diğer</option>
                                </select>
                              </label>
                            )}
                            {selectedOption === "banner" + index && (
                              <label>
                                {startup?.banner ? (
                                  <label
                                    htmlFor={"startup-banner-input" + index}
                                  >
                                    <TwicPicture
                                      src={startup?.banner}
                                      className="w-12 h-12 rounded-full cursor-pointer"
                                    />
                                  </label>
                                ) : (
                                  <label
                                    htmlFor={"startup-banner-input" + index}
                                    className="cursor-pointer"
                                  >
                                    <Camera className="p-3 h-12 w-12 bg-gray-500 rounded-full" />
                                  </label>
                                )}
                                <input
                                  type="file"
                                  onChange={(e) =>
                                    handleFileUploadForStartup(
                                      e,
                                      "banner",
                                      startup._id
                                    )
                                  }
                                  accept="image/*"
                                  id={"startup-banner-input" + index}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {/* provided.placeholder burada ekleniyor */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ProjectEdit;
