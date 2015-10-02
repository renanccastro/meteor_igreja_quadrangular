Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'name',
        fieldLabel: 'Nome',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Por favor, escreva seu nome.");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'gender',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'Sexo',
        inputType: 'radio',
        radioLayout: 'inline',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
            id: 1,                  // id suffix of the radio element
            label: 'Masculino',          // label for the radio element
            value: 'm'              // value of the radio element, this will be saved.
          }, {
            id: 2,
            label: 'Feminino',
            value: 'f',
            checked: 'checked'
        }],
        visible: true
    },{
        fieldName: 'capela',
        fieldLabel: 'Capela',
        inputType: 'select',
        showFieldLabel: true,
        data: [{
            id: 1,
            label: 'Zona Norte',
            value: 'zn'
          }, {
            id: 2,
            label: 'Zona Sul',
            value: 'zn',
        },{
            id: 3,
            label: 'Vila São Pedro',
            value: 'vsp',
        },{
            id: 4,
            label: 'Catedral',
            value: 'cat',
        },{
            id: 5,
            label: 'Nenhuma',
            value: 'none',
        }],
        visible: true
    }]
});