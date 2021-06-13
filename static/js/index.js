/// <reference path="../../typings/globals/jquery/index.d.ts" />

function hello(value) {
  $(document).ready(function () {
    $("#hidebtn").click();

    $("#modalbtn").click(function () {
      location.href = `./del?_id=${value}`;
    });
  });
}
$(document).ready(function () {
  $(".updateb").click(function () {
    let _id = $(this).parent().children()[1].value;
    let titel = $(this).parent().children()[0].innerText;
    // let titel = $(this).parent().children()[0];
    let massage = $(this).parent().children()[2].children;
    let massagelength = $(this).parent().children()[2].children.length;
    let index = 0;
    let textareadata = "";
    for (i of massage) {
      console.log(i.innerText);
      textareadata += `${i.innerText}`;
      if (index != massagelength - 1) {
        textareadata += "\n";
      }
      index++;
    }
    // console.log(massagelength);
    $("#update_id").val(_id);
    $("#updatetitel").val(titel);
    $("#updatemassage").val(textareadata);

    $("#updatebtnmodal").click();
  });
  $("#flexRadioDefault1").click(function () {
    $("#search").attr("placeholder", "Search by Titel");
  });
  $("#flexRadioDefault2").click(function () {
    $("#search").attr("placeholder", "Search by Massage");
  });

  $("#search").on("input", function () {
    let val = $(this).val();
    let reg = RegExp(val);
    // console.log($(this).val());
    // console.log(titel);
    if ($("input[type='radio'][name='flexRadioDefault']:checked").val() == "titel") {
      let titel = $(".seachusetitel");
      for (const iterator of titel) {
        // console.log(iterator);
        let result = reg.exec(iterator.innerText);
        if (result != null) {
          $(iterator).parent().parent().show();
        }
        if (result == null) {
          $(iterator).parent().parent().hide();
        }
      }
    } else {
      let massage = $(".seachusemassage");
      for (const iterator1 of massage) {
        // console.log(iterator1);
        let a = iterator1.children;
        //  console.log(a);
        for (const iterator2 of a) {
          // console.log(iterator2.innerText);
          result1 = reg.exec(iterator2.innerText);

          // console.log(result1);
          if (result1 != null) {
            // console.log($(iterator1).parent().parent());
            $(iterator1).parent().parent().show();
            break;
          } else {
            $(iterator1).parent().parent().hide();
          }
        }
      }
    }
  });
});
