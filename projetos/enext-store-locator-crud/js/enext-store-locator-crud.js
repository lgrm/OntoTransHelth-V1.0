define(

  ['knockout', 'CCi18n'],

  function (ko, CCi18n) {

    "use strict";

    return {

      resourcesLoaded: function (widget) {},

      onLoad: function (widget) {

      
        
        widget.selectedTemplate = ko.observable(false);
        widget.isActive = function () { widget.selectedTemplate(!widget.selectedTemplate())} ;


        widget.selectedStore = ko.observable(false);
              
        widget.countries = ko.observableArray(['COUNTRY','Afghanistan', 'Albania', 'Algeria', "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]);


        widget.properties = ko.observable({
          street: ko.observable(),
          county: ko.observable(),
          postalCode: ko.observable(),
          city: ko.observable(),
          state: ko.observable(),
          longitute: ko.observable(),
          latitude: ko.observable(),
          phone: ko.observable(),
          site: ko.observableArray([]),
          type: ko.observable(),
          openingHour: ko.observable(),
          closingHour: ko.observable()
        });

        widget.cleanForm = function () {
          //Limpa valores do formulário de cep.
          widget.properties().street("");
          widget.properties().county("");
          widget.properties().postalCode("");
          widget.properties().city("");
          widget.properties().state("");

        }

        widget.updateFields = function (content) {
          //Update the fields with the values
          if (!("erro" in content)) {
            widget.properties().street(content.logradouro);
            widget.properties().county(content.bairro);
            widget.properties().city(content.localidade);
            widget.properties().state(content.uf);

          } else {
            //Zipcode not found.
            widget.cleanForm();
            alert("Zipcode not found");
          }
        }

        widget.searchZipCode = function (zipcd) {
          //New variable "zipcode" only with digits

          var zipCode = zipcd.replace(/\D/g, '');

          //Verify if the field "zipcode" have the informed value
          if (zipCode != "") {
            //Expression to validate the zipcode
            var validateZip = /^[0-9]{8}$/;
            //Validate the zipcode format
            if (validateZip.test(zipCode)) {

              //Fill the fields with "..." while serach in the webservice
              widget.properties().street("...");
              widget.properties().county("...");
              widget.properties().city("...");
              widget.properties().state("...");

              //Creat an javascipt element
              // var script = widget.createElement('script');
              //synchronize with the callback
              fetch('https://viacep.com.br/ws/' + zipCode + '/json').then(function (res) {
                console.log("RES: ", res);
                res.json().then(function (response) {
                  console.log("response: ", response);
                  widget.updateFields(response);
                });
              }).catch(function (error) {
                console.log("ERROR: ", error);
              });
              //script.src ='https://viacep.com.br/ws/'+ zipCode + '/json/?callback=updateFields';

              //Insert the script in the document and load the content
              //  widget.body.appendChild(script);
            } else {
              //Zipcode invalid
              widget.cleanForm();
              alert("ZipCode not found");
            }
          } else {
            //zipcode without value
            widget.cleanForm();
          }
        }


      },
      beforeAppear: function (page) {}
    }
  }
);