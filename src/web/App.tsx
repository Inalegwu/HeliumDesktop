import React from "react";
import { HiCog, HiHashtag, HiMinus, HiPlus } from "react-icons/hi";
import { NoteType, Settings, States } from "./utils/types";
import { useAtom } from "jotai";
import {
  activeDocumentAtom,
  activePageAtom,
  colorModeAtom,
  colorsAtom,
} from "./atoms";
import { Link } from "react-router-dom";
import "./App.css";
import { Editor, Indicator, MenuButton, SideNav } from "./components/styled";
import CreateDocument from "./components/CreateDocument";
import CreatePage from "./components/CreatePage";
import DocumentItem from "./components/DocumentItem";
import NoteItem from "./components/NoteItem";

function App() {
  const [pages, setPages] = React.useState<NoteType[]>([]);
  // for checking the state of the window size (aids with scaling)
  const [isReduced, setIsReduced] = React.useState<boolean>(false);
  const [documents, setDocuments] = React.useState<Array<any>>([]);

  // handles the color of the background image splotches ( if the values from settings is undefined it
  // defaults to the application defined settings other wise it uses the users most recently saved values)
  const [colors, setColors] = useAtom(colorsAtom);
  // handles the color mode of the UI [light or dark] eventually , I will add support for
  // theme.json files that can be read into the application to affect the color schemes of the
  // color modes
  const [colorMode, setColorMode] = useAtom(colorModeAtom);
  // checks whether the user is online , so that syncing can occur
  const [isOnline, setIsOnline] = React.useState<States>(
    navigator.onLine ? States.ONLINE : States.OFFLINE
  );

  // states that relate to create a new document
  const [createDocumentTitle, setCreateDocumentTitle] =
    React.useState<string>("");
  const [createDocumentDescription, setCreateDocumentDescription] =
    React.useState<string>("");
  const [createDocumentVisible, setCreateDocumentVisible] =
    React.useState<boolean>(false);
  const [createPageVisible, setCreatePageVisible] =
    React.useState<boolean>(false);
  const [createPageTitle, setCreatePageTitle] = React.useState<string>("");
  const [activeDocument, setActiveDocument] = useAtom(activeDocumentAtom);
  const [activePage, setActivePage] = useAtom(activePageAtom);

  // sends a notification whenever the app comes online
  window.ononline = (e) => {
    setIsOnline(States.ONLINE);
    new Notification("Back Online 👍👍");
  };

  // sends a notification whenever the app goes offline
  window.onoffline = (e) => {
    setIsOnline(States.OFFLINE);
    new Notification("Offline 😔");
  };

  // reads in the users settings from the settings.json file and sets the application
  // color mode and background colors approprietly
  React.useMemo(() => {
    window.electronAPI?.readSettings().then((res: Settings) => {
      if (res != undefined) {
        setColorMode(res?.colorMode);
        setColors([res.blurColor1.toString(), res.blurColor2.toString()]);
      }
    });
  }, [colorMode, setColorMode, colors, setColors]);

  // reads in the users pages from the backend
  React.useMemo(() => {
    window.electronAPI.readDocuments().then((res) => {
      setDocuments(res);
    });
  }, [pages, setPages]);

  const findActiveDocPages = (id: any) => {
    window.electronAPI
      .readPagesByDocumentId(activeDocument.id)
      .then((res) => {
        setPages(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNewDocument = () => {
    const newDocument = {
      document_name: createDocumentTitle,
      description: createDocumentDescription,
    };
    window.electronAPI.createDocument(newDocument);
  };
  const createNewPage = () => {
    const newPage = {
      title: createPageTitle,
      document_id: activeDocument?.id,
    };
    window.electronAPI.createPage(newPage);
  };

  return (
    <div className="w:full h:full">
      <div
        className={`w:70vh h:70vh border-radius:50% bg:${colors[0]} position:absolute z:0`}
      ></div>
      <div
        className={`w:70vh h:70vh border-radius:50% bg:${colors[1]} left:80% top:50% position:absolute z:0`}
      ></div>
      {/* actual body of app */}
      <div
        className={`position:absolute z:100 w:full h:full bg:${
          colorMode === "light" ? "#ffffff3e" : "#00000078"
        } bd:blur(200px) bg display:flex`}
      >
        <div
          className={`w:25% bg:${
            colorMode === "light" ? "white" : "black"
          } display:flex flex-direction:col`}
        >
          {/* app navigation */}
          <SideNav
            onDrag={(e) => {
              window.moveTo(e.nativeEvent.clientX, e.nativeEvent.clientY);
            }}
          >
            <div className="width:90% height:100% padding:1px">
              <MenuButton
                title="Quit"
                onClick={() => {
                  window.close();
                }}
                color="#d63d45"
              ></MenuButton>
              <MenuButton
                title="Scale"
                onClick={() => {
                  // check if the window is reduced. if it isn't ?
                  // reduce the size by a factor of 150 (-150 from total window size) on both axis
                  // otherwise , increase by 150 (+150 from to total window size)
                  isReduced === false
                    ? (window.resizeBy(-150, -150), setIsReduced(true))
                    : (window.resizeBy(150, 150), setIsReduced(false));
                }}
                color="#e6a862"
              ></MenuButton>
              <MenuButton
                title="Maximize"
                onClick={
                  // still don't know what the maximize functionality
                  //will look like
                  () => {}
                }
                color="#293f66"
              ></MenuButton>
            </div>
            <div className="display:flex align-items:center align-content:center">
              <Link to="/settings" className="padding:5px border-radius:2px">
                <HiCog
                  color={colorMode === "light" ? "black" : "white"}
                  size={16}
                />
              </Link>
            </div>
          </SideNav>
          <div className="height:92vh width:full display:flex flex-direction:col padding:10px">
            {documents.length > 0 ? (
              <>
                <div className="display:flex width:full justify-content:space-between align-content:center align-items:center">
                  <h2
                    className={`color:${
                      colorMode === "light" ? "#000000" : "#ffffff"
                    }`}
                  >
                    Documents
                  </h2>
                  <button
                    onClick={() => {
                      setCreateDocumentVisible(!createDocumentVisible);
                    }}
                    className={`border:none bg:${
                      colorMode === "light" ? "#ececec" : "#292929"
                    } border-radius:5px padding:5px align-content:center align-items:center`}
                  >
                    {createDocumentVisible === false ? (
                      <HiPlus
                        size={16}
                        color={colorMode === "light" ? "#000000" : "#ffffff"}
                      />
                    ) : (
                      <HiMinus
                        size={16}
                        color={colorMode === "light" ? "#000000" : "#ffffff"}
                      />
                    )}
                  </button>
                </div>
                {documents.map((doc) => {
                  return (
                    <>
                      <DocumentItem
                        document={doc}
                        setActiveDocument={setActiveDocument}
                        findActiveDocPages={findActiveDocPages}
                      />
                    </>
                  );
                })}
                {createDocumentVisible === true ? (
                  <>
                    <CreateDocument
                      setCreateDocumentDescription={
                        setCreateDocumentDescription
                      }
                      setCreateDocumentTitle={setCreateDocumentTitle}
                      createNewDocument={createNewDocument}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <h2
                  className={`color:${
                    colorMode === "light" ? "black" : "white"
                  }`}
                >
                  No Documents
                </h2>
                <p className="font:12 font:bold italic color:gray">
                  Create One
                </p>
                <CreateDocument
                  setCreateDocumentDescription={setCreateDocumentDescription}
                  setCreateDocumentTitle={setCreateDocumentTitle}
                  createNewDocument={createNewDocument}
                />
              </>
            )}
          </div>
          <div className="height:4vh padding:5px display:flex justify-content:space-between align-items:center align-content:center width:full">
            <h6
              className={`color:${
                colorMode === "light" ? "#000000" : "#ffffff"
              }`}
            >
              {isOnline === States.ONLINE ? "Online" : "Offline"}
            </h6>
            <Indicator color={isOnline === States.ONLINE ? "green" : "red"} />
          </div>
        </div>
        {/* page list */}
        <div className="w:25% padding:10px">
          {activeDocument === undefined ? (
            <div className="display:flex flex-direction:col align-items:center align-content:center justify-content:center">
              <h2
                className={`font:20 color:${
                  colorMode === "light" ? "#000000" : "#ffffff"
                } text-align:center italic font-weight:300`}
              >
                Select A Document To See Pages In It
              </h2>
            </div>
          ) : (
            <>
              {pages.length > 0 ? (
                <>
                  <div className="display:flex w:full justify-content:space-between">
                    {" "}
                    <h3>Pages</h3>
                    <div className="w:20% display:flex justify-content:space-evenly">
                      <button
                        title="Create Page"
                        onClick={() => {
                          setCreatePageVisible(!createPageVisible);
                        }}
                        className={`border:none bg:${
                          colorMode === "light" ? "#ececec" : "#292929"
                        } border-radius:5px padding:5px align-content:center align-items:center`}
                      >
                        {createPageVisible === false ? (
                          <HiPlus
                            size={16}
                            color={
                              colorMode === "light" ? "#000000" : "#ffffff"
                            }
                          />
                        ) : (
                          <HiMinus
                            size={16}
                            color={
                              colorMode === "light" ? "#000000" : "#ffffff"
                            }
                          />
                        )}
                      </button>
                      <button
                        title="Create Tag"
                        className={`border:none bg:${
                          colorMode === "light" ? "#ececec" : "#292929"
                        } border-radius:5px padding:5px align-content:center align-items:center`}
                      >
                        <HiHashtag
                          size={16}
                          color={colorMode === "light" ? "#000000" : "#ffffff"}
                        />
                      </button>
                    </div>
                  </div>
                  {pages.map((page) => {
                    return (
                      <NoteItem page={page} setActivePage={setActivePage} />
                    );
                  })}
                  {createPageVisible === true ? (
                    <CreatePage
                      createNewPage={createNewPage}
                      setCreatePageTitle={setCreatePageTitle}
                    />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <div className="display:flex w:full justify-content:space-between align-items:center align-content:center">
                    <h1
                      className={`color:${
                        colorMode === "light" ? "#000000" : "#e4e3e3"
                      }`}
                    >
                      No Files
                    </h1>
                    <button
                      onClick={() => {
                        setCreatePageVisible(!createPageVisible);
                      }}
                      className={`border:none bg:${
                        colorMode === "light" ? "#ececec" : "#292929"
                      } border-radius:5px padding:5px align-content:center align-items:center`}
                    >
                      {createPageVisible === false ? (
                        <HiPlus
                          size={16}
                          color={colorMode === "light" ? "#000000" : "#ffffff"}
                        />
                      ) : (
                        <HiMinus
                          size={16}
                          color={colorMode === "light" ? "#000000" : "#ffffff"}
                        />
                      )}
                    </button>
                  </div>
                  {createPageVisible === true ? (
                    <CreatePage
                      createNewPage={createNewPage}
                      setCreatePageTitle={setCreatePageTitle}
                    />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </div>
        {/* editor */}
        <div className="w:50% h:full">
          <h1>{activePage?.file_name}</h1>
          <Editor defaultValue={activePage?.file_content} />
        </div>
      </div>
    </div>
  );
}

export default App;
