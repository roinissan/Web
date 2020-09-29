const serverURL = "http://localhost:4008";

createTable = function (id, readOnly) {
  $(`#${id}`).append(createTableElement(id, readOnly));
};

createTableElement = function (tableID, readOnly) {
  let nameInputID = `${tableID}NameInput`;
  let nameColorID = `${tableID}NameColor`;
  let shippingInputID = `${tableID}ShippingInput`;
  let preperationInputID = `${tableID}PreperationInput`;
  let exceptionsInputID = `${tableID}ExceptionsInput`;

  let exceptionDiv;
  let titleColorButton;
  if (readOnly) {
    exceptionDiv = `<div style="height:100%;width:100%; overflow-y:auto">
                        <div class="exceptionDiv" id=${exceptionsInputID}></div>   
                    </div>`;
    titleColorButton = ``;
  } else {
    exceptionDiv = `<div style="height:100%;width:100%; overflow-y:auto">
                        <div class="exceptionDiv" id=${exceptionsInputID}></div><br>   
                        <button type="button" class="btn btn-primary exceptionButton" >הוסף</button>
                    </div>`;
    titleColorButton = `<button type="button" class="btn btn-dark btn-sm titleColor" id="${nameColorID}">צבע</button>`;
  }
  let tableTemplate = `<div class="table-wrapper-scroll-y">
                          <table class="table table-bordered" style="height: 100%;">
                              <tbody>
                                  <tr style="height: 15%; class=".myTr"">
                                      <th colspan="2">
                                          <input type="text" class="form-control inputHeader" id=${nameInputID}></input>
                                          ${titleColorButton}                
                                      </th>
                                  </tr>
                                  <tr>
                                      <th>
                                        <input type="text" class="form-control" id=${preperationInputID}></input>                   
                                      </th>
                                      <th>
                                         <input type="text" class="form-control" id=${shippingInputID}></input>            
                                      </th>
                                  </tr>              
                                  <tr style="height: 70%;">          
                                      <th colspan="2">
                                          ${exceptionDiv}
                                      </th>
                                  </tr>
                              </tbody>
                          </table>
                      </div>`;

  return tableTemplate;
};

createExceptionElement = function (tableID, exceptionIndex, readOnly) {
  let rightEdgeClass = "rightEdge";
  let leftEdgeClass = "leftEdge";
  let input;
  if (!readOnly)
    input = `<div style="display: flex; flex-direction: row;"> 
                  <input type="text" class="form-control exceptionName ${rightEdgeClass}" id=${tableID}Exception${exceptionIndex}Name>                
                  <input type="text" class="form-control exceptionVal ${leftEdgeClass}" id=${tableID}Exception${exceptionIndex}Value>               
                  <button type="button" class="btn btn-default" aria-label="Left Align" onclick="removeExceptionsElement(this)" id=${tableID}Exception${exceptionIndex}Hide>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-minus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"/>
                      <path fill-rule="evenodd" d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </button>
                  </div>`;
  else
    input = `<div style="display: flex; flex-direction: row;">
                  <input type="text" class="form-control exceptionName ${rightEdgeClass}" style="width:70%" id=${tableID}Exception${exceptionIndex}Name>
                  <input type="text" class="form-control exceptionVal ${leftEdgeClass}" style="width:30%" id=${tableID}Exception${exceptionIndex}Value>                
                  </div>`;

  return input;
};

removeExceptionsElement = function (element) {
  let IDSemantic = element.id.split(/(?=[A-Z])/);
  let tableID = IDSemantic[0];
  let restData = JSON.parse(sessionStorage.getItem("restData"));
  let excpetionIndex = parseInt(IDSemantic[1].match(/\d+$/));

  restData[tableID].exceptions[excpetionIndex][2] = 0;
  sessionStorage.setItem("restData", JSON.stringify(restData));

  $(`#${element.id}`).parent().hide();

  setRestData(tableID);
};

updateTableData = function (tableID, readOnly) {
  let restData = JSON.parse(sessionStorage.getItem("restData"));
  if (!restData || !restData[tableID]) return;

  let nameInputID = `${tableID}NameInput`;
  let shippingInputID = `${tableID}ShippingInput`;
  let preperationInputID = `${tableID}PreperationInput`;
  let exceptionsInputID = `${tableID}ExceptionsInput`;
  let exceptionIndex = 0;

  $(`#${nameInputID}`).val(restData[tableID].name);
  $(`#${nameInputID}`)
    .parent()
    .css("background-color", restData[tableID].nameBcolor);
  $(`#${nameInputID}`)
    .parent()
    .find("input")
    .css("color", restData[tableID].nameFcolor);
  $(`#${shippingInputID}`).val(restData[tableID].shippingTime);
  $(`#${preperationInputID}`).val(restData[tableID].preperationTime);
  $(`#${exceptionsInputID}`).empty();
  restData[tableID].exceptions.forEach((element) => {
    $(`#${exceptionsInputID}`).append(
      createExceptionElement(tableID, exceptionIndex, readOnly)
    );
    $(`#${tableID}Exception${exceptionIndex}Name`).val(element[0]);
    $(`#${tableID}Exception${exceptionIndex}Value`).val(element[1]);
    if (!element[2])
      $(`#${tableID}Exception${exceptionIndex}Name`).parent().hide();
    exceptionIndex++;
  });
};

updateInputData = function (inputID) {
  let inputSemantic = inputID.split(/(?=[A-Z])/);
  let tableID = inputSemantic[0];
  let restData = JSON.parse(sessionStorage.getItem("restData"));
  let tableData = restData[tableID];
  let newVal = $(`#${inputID}`).val();

  if (inputSemantic[1] == "Name" && inputSemantic[2] == "Input")
    tableData.name = newVal;
  else if (inputSemantic[1] == "Name" && inputSemantic[2] == "Color") {
    tableData.nameBcolor = $(`#${inputID}`)
      .parent()
      .css("background-color")
      .replace(/\s/g, "");
    tableData.nameFcolor = $(`#${inputID}`)
      .parent()
      .find("input")
      .css("color")
      .replace(/\s/g, "");
  } else if (inputSemantic[1] == "Shipping") tableData.shippingTime = newVal;
  else if (inputSemantic[1] == "Preperation")
    tableData.preperationTime = newVal;
  else {
    let excpetionIndex = parseInt(inputSemantic[1].match(/\d+$/));
    if (excpetionIndex + 1 > tableData.exceptions.length) {
      let newInput = [];
      let exceptionVValue;
      if (inputSemantic[2] == "Name") {
        exceptionVValue = $(
          `#${inputSemantic.slice(0, -1).toString()}Value`
        ).val();
        newInput[0] = newVal;
        newInput[1] = exceptionVValue;
      } else {
        exceptionVValue = $(
          `#${inputSemantic.slice(0, -1).toString()}Name`
        ).val();
        newInput[0] = exceptionVValue;
        newInput[1] = newVal;
      }
      newInput[2] = 1;
      tableData.exceptions.push(newInput);
    } else {
      if (inputSemantic[2] == "Name")
        tableData.exceptions[excpetionIndex][0] = newVal;
      else tableData.exceptions[excpetionIndex][1] = newVal;
    }
  }
  restData[tableID] = tableData;
  sessionStorage.setItem("restData", JSON.stringify(restData));
  setRestData(tableID);
};

updateRemarksData = function (text) {
  let restData = JSON.parse(sessionStorage.getItem("restData"));
  restData.remarks = text;
  sessionStorage.setItem("restData", JSON.stringify(restData));
  setRestRemarks();
};

setRestRemarks = function () {
  let restData = JSON.parse(sessionStorage.getItem("restData"));
  let remarks = restData.remarks;

  let http = new XMLHttpRequest();
  let url = `${serverURL}/restaurants/updateRemarks`;
  let method = "PUT";

  http.open(method, url);
  http.setRequestHeader("Content-Type", "application/json");

  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 201) {
      console.log("Update Succeeded");
    } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 201) {
      console.log("Error");
      throw new Error("Server Error");
    }
  };

  http.send(JSON.stringify({ remarks: remarks }));
};

setRestData = function (tableID) {
  let restData = JSON.parse(sessionStorage.getItem("restData"));
  let tableData = restData[tableID];

  let http = new XMLHttpRequest();
  let url = `${serverURL}/restaurants/updateRestaurant`;
  let method = "PUT";

  http.open(method, url);
  http.setRequestHeader("Content-Type", "application/json");

  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 201) {
      console.log("Update Succeeded");
    } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 201) {
      console.log("Error");
      throw new Error("Server Error");
    }
  };

  http.send(JSON.stringify({ restID: tableID, restData: tableData }));
};

setRemarksData = function () {
  let restData = JSON.parse(sessionStorage.getItem("restData"));
  if (restData.remarks) $("#remarks").empty().append(`${restData.remarks}`);
  else $("#remarks").val(``);
};

getRestData = function (readOnly) {
  let http = new XMLHttpRequest();
  let url = `${serverURL}/restaurants/all`;
  let method = "GET";

  http.open(method, url);

  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
      sessionStorage.setItem(
        "restData",
        JSON.stringify(JSON.parse(http.responseText))
      );
      updateAll(readOnly);
      if (!readOnly) {
        // updates jodit
        $("#spinner").hide();
        setJodit();
        // event listener for updating data of tables
        $(".form-control").bind("input propertychange", function () {
          updateInputData($(this).attr("id"));
        });

        // event listener for updating data of remarks
        $(".remarks").bind("input propertychange", function () {
          updateRemarksData($(this).attr("id"));
        });
      } else {
        $("input").prop("disabled", true);
      }
      return true;
    } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
      console.log("Error");
      throw new Error("Server Error");
    }
  };
  http.send();
};

setJodit = function () {
  Jodit.defaultOptions.controls.save = {
    iconURL: "./utils/save.png",
    exec: function () {
      let text = editor.value;
      updateRemarksData(text);
    },
  };
  let editor = new Jodit("#editor", {
    toolbarAdaptive: false,
    direction: "rtl",
    width: "100%",
    extraButtons: ["save"],
    offsetTopForAssix: 74,
  });
  let restData = JSON.parse(sessionStorage.getItem("restData"));
  editor.setEditorValue(restData.remarks);
};

updateAll = function (readOnly) {
  tableIDs = [
    "table1",
    "table2",
    "table3",
    "table4",
    "table5",
    "table6",
    "table7",
    "table8",
    "table9",
  ];
  tableIDs.forEach((el) => {
    updateTableData(el, readOnly);
  });
  setRemarksData();
};

increaseFontSize = function () {
  let currSize = parseInt($(":root").css("font-size")) + 3;
  if (currSize <= 100) $(":root").css("font-size", currSize + "px");
};
increaseMFontSize = function () {
  let currSize = parseInt($(".mobileContainer").css("font-size")) + 3;
  if (currSize <= 100) $(".mobileContainer").css("font-size", currSize + "px");
};

decreaseFontSize = function () {
  let currSize = parseInt($(":root").css("font-size")) - 3;
  if (currSize > 10) $(":root").css("font-size", currSize + "px");
};
decreaseMFontSize = function () {
  let currSize = parseInt($(".mobileContainer").css("font-size")) - 3;
  if (currSize > 10) $(".mobileContainer").css("font-size", currSize + "px");
};
