import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { 
    loading: false, 
    showPhone: false,
    primaryBathroomSelected: false,
    postalCodeDetail: undefined,
    manufacturers: [],
    data: {
        email: '',
        postalCode: '',
        phone: undefined,
        householdType: '',
        bedroomCount: '0',
        occupantCount: '0',
        squareFootage: '',
        bathrooms: [],
        appliances: [],
    } 
};

export const mockData = {
    loading: false,
    showPhone: true,
    primaryBathroomSelected: true,
    postalCodeDetail: {
      postalcode: '87120',
      city: 'Albuquerque',
      astate: 'NM'
    },
   manufacturers: [],
    data: {
      email: 'rockjimstar@gmail.com',
      postalCode: '87120',
      phone: {
        areaCode: 505,
        number: '907-4168',
        type: 'Mobile'
      },
      householdType: 'House',
      bedroomCount: 3,
      occupantCount: 4,
      squareFootage: 1200,
      bathrooms: [
        {
          commodeCount: 1,
          sinkCount: 2,
          bidetCount: '0',
          bathtubCount: 1,
          showerCount: 1,
          tubShowerCount: '0',
          primary: true,
          ordinal: 1,
          bathroomType: 'FULL_BATHROOM'
        },
        {
          commodeCount: 1,
          sinkCount: 1,
          bidetCount: '0',
          name: 'Hall Bathroom',
          ordinal: 2,
          bathroomType: 'HALF_BATHROOM'
        }
      ],
      appliances: [
        {
          ordinal: 1,
          applianceType: 'REFRIGERATOR_FREEZER',
          manufacturer: 'Dopglibefazz  Company',
          modelName: '1234x',
          refrigeratorFreezerType: 'Side-by-side refrigerator'
        },
        {
          ordinal: 2,
          applianceType: 'COOKER',
          manufacturer: 'Frowerupar  ',
          modelName: '55548i',
          ovenType: 'Conventional',
          cooktopHeatSource: 'Electric',
          ovenHeatSources: [
            'Electric',
            'Microwave'
          ]
        },
        {
          ordinal: 3,
          applianceType: 'WASHER',
          manufacturer: 'Upcadupower Direct ',
          modelName: 'series 25x',
          loadingType: 'Top'
        },
        {
          ordinal: 4,
          applianceType: 'DRYER',
          manufacturer: 'Klifropover International ',
          modelName: 'flsxz2ir5',
          heatSource: 'Gas'
        },
        {
          ordinal: 5,
          applianceType: 'TV',
          manufacturer: 'Adkilicator WorldWide Company',
          modelName: '85swhd',
          displaySize: 85,
          displayType: 'LED',
          maxResolution: '2160p (4K)'
        }
      ]
    },
    validPostalCode: true
    };

export const phoneInitialState = {
    areaCode: '',
    number: '',
    type: '',
};

const bathroomBase = {
    commodeCount: '0',
    sinkCount: '0',
    bidetCount: '0',
};

const halfBathroomInitialState = {
    ...bathroomBase,
    name: '',
};

const fullBathroomInitialState = {
    ...bathroomBase,
    bathtubCount: '0',
    showerCount: '0',
    tubShowerCount: '0',
    primary: false,
};

export const bathroomState = {
    ordinal: 0,
    halfBathroom: halfBathroomInitialState,
    fullBathroom: fullBathroomInitialState
};

export const refrigeratorFreezerInitialState = {
    refrigeratorFreezerType: '',
};

export const dryerInitialState = {
    heatSource: '',
};

export const washerInitialState = {
    loadingType: '',
};

export const tvInitialState = {
    displaySize: '',
    displayType: '',
    maxResolution: '',
};

export const cookerInitialState = {
    ovenType: '',
    cooktopHeatSource: '',
    ovenHeatSources: {
        gas: false,
        electric: false,
        microwave: false,
    },
};

export const applianceState = {
    ordinal: 0,
    applianceType: '',
    manufacturer: '',
    modelName: '',
    refrigeratorFreezer: undefined,
    dryer: undefined,
    washer: undefined,
    tv: undefined,
    cooker: undefined,
};

export const emailCheck = createAsyncThunk(
    'household/emailCheck',
    async (emailToCheck) => {
        const response = await axios.post('http://localhost/email-check', {
            email: emailToCheck
        });
        return response.data
});

export const postalCodeCheck = createAsyncThunk(
    'household/postalCodeCheck',
    async (postalCodeToCheck) => {
        const response = await axios.post('http://localhost/postal-code', {
            postalCode: postalCodeToCheck
        });
        return response.data
});

export const phoneCheck = createAsyncThunk(
    'household/phoneCheck',
    async (phoneToCheck) => {

        if(!phoneToCheck){
            return {};
        }

        const response = await axios.post('http://localhost/phone-check', {
            areaCode: phoneToCheck.areaCode,
            phoneNumber: phoneToCheck.number.replace('-', ''),
        });
        return response.data
});

export const getAllManufacturers = createAsyncThunk(
    'household/getAllManufacturers',
    async () => {
        const response = await axios.get('http://localhost/appliance-manufacturers');
        return response.data
});

export const insertAllHouseholdData = createAsyncThunk(
    'household/insertAllHouseholdData',
    async (args, {getState}) => {
        const inputData = getState().household.data;

        let household = {
            emailAddress: inputData.email.trim(),
            homeType: inputData.householdType,
            bedrooms: inputData.bedroomCount,
            occupants: inputData.occupantCount,
            squareFootage: inputData.squareFootage,
            postalCode: inputData.postalCode.trim(),
        };

        let phone = undefined;
        if(inputData.phone){
            phone = {
                areaCode: inputData.phone.areaCode,
                phoneNumber: inputData.phone.number.replace('-', ''),
                phoneType: inputData.phone.type,
            };
        }

        let bathroom = inputData.bathrooms.map((bathroom, index) => {
            let bathroomBase = {
                bathroomOrdinal: bathroom.ordinal,
                commodesCount: bathroom.commodeCount,
                sinksCount: bathroom.sinkCount,
                bidetsCount: bathroom.bidetCount,
            };

            let bathroomType = (bathroom.bathroomType === bathroomTypeValues.FULL_BATHROOM) ? 'full' : 'half';

            let bathroomOther = {}

            if(bathroom.bathroomType === bathroomTypeValues.FULL_BATHROOM){
                bathroomOther = {
                    bathtubCount: bathroom.bathtubCount,
                    showerCount: bathroom.showerCount,
                    tubShowerCount: bathroom.tubShowerCount,
                    primaryBathroom: bathroom.primary,
                };
            }
            else{
                bathroomOther = {
                    bathroomName: bathroom.name.trim(),
                };
            }
            
            return {
                bathroomBase,
                bathroomType,
                bathroomOther,
            };
        });

        let appliance = inputData.appliances.map((appliance, index) => {
            let applianceType = '';

            let applianceBaseData = {
                applianceOrder: appliance.ordinal,
                modelName: appliance.modelName.trim(),
                manufacturerName: appliance.manufacturer.trim(),
            };

            let applianceOtherData = {};

            switch(appliance.applianceType){
                case applianceTypeValues.REFRIGERATOR_FREEZER.value:
                    applianceType = applianceTypeValues.REFRIGERATOR_FREEZER.name;
                    applianceOtherData = {
                        refrigeratorFreezerType: appliance.refrigeratorFreezerType,
                    };
                    break;
                case applianceTypeValues.COOKER.value:
                    applianceType = applianceTypeValues.COOKER.name;

                    let heatSources = appliance.ovenHeatSources.map((h, index) => {
                        return {
                            heatSource: h,
                        }
                    });

                    let oven = {
                        ovenType: appliance.ovenType,
                        heatSource: heatSources,
                    };

                    let cooktop = {
                        heatSource: appliance.cooktopHeatSource,
                    };
                    
                    let cookerData = [
                        {
                            cookerType: 'Oven',
                            cookerItemData: oven,
                        },{
                            cookerType: 'Cooktop',
                            cookerItemData: cooktop,
                        }
                    ];

                    applianceOtherData = {
                        cookerData
                    };
                    break;
                case applianceTypeValues.DRYER.value:
                    applianceType = applianceTypeValues.DRYER.name;
                    applianceOtherData = {
                        heatSource: appliance.heatSource,
                    };
                    break;
                case applianceTypeValues.WASHER.value:
                    applianceType = applianceTypeValues.WASHER.name;
                    applianceOtherData = {
                        loadingType: appliance.loadingType,
                    };
                    break;
                case applianceTypeValues.TV.value:
                    applianceType = applianceTypeValues.TV.name;
                    applianceOtherData = {
                        displaySize: appliance.displaySize,
                        displayType: appliance.displayType,
                        maxResolution: appliance.maxResolution,
                    };
                    break;
                default:
                    applianceType = 'UNKNOWN';
                    break;
            }

            return {
                applianceType,
                applianceBaseData,
                applianceOtherData,
            };
        });

        let response = {};
        
        if(phone){
            response = await axios.post('http://localhost/add-data', {
                household,
                phone,
                bathroom,
                appliance,
            });
        }
        else{
            response = await axios.post('http://localhost/add-data', {
                household,
                bathroom,
                appliance,
            });
        }

        return response.data;
});

export const bathroomTypeValues = {
    FULL_BATHROOM: 'FULL_BATHROOM',
    HALF_BATHROOM: 'HALF_BATHROOM'
};

export const applianceTypeValues = {
    REFRIGERATOR_FREEZER: {name: 'RefrigiratorFreezer', value: 'REFRIGERATOR_FREEZER'},
    COOKER: {name: 'Cooker', value: 'COOKER'},
    WASHER: {name: 'Washer', value: 'WASHER'},
    DRYER: {name: 'Dryer', value: 'DRYER'},
    TV: {name: 'TV', value: 'TV'},
};


const householdSlice = createSlice({
    name: 'household',
    initialState,
    // initialState: mockData,
    reducers: {
        resetState(state, action) {
            state = {};
        },
        updateStateValues(state, action) {
            state.data = action.payload;
        },
        validPostalCode(state, action){
            state.validPostalCode = action.payload;
        },
        showPhone(state, action){
            state.showPhone = action.payload;
        },
        addFullBathroom(state, action){
            const bathroom = {
                ...action.payload.fullBathroom,
                ordinal: (state.data.bathrooms?.length) ? state.data.bathrooms.length + 1 : 1,
                bathroomType: bathroomTypeValues.FULL_BATHROOM,
            };

            if(!Array.isArray(state.data.bathrooms)){
                state.data.bathrooms = [];
            }

            state.data.bathrooms.push(bathroom);
            state.primaryBathroomSelected = false;
            state.data.bathrooms.forEach(b => {
                if(b.primary){
                    state.primaryBathroomSelected = true;
                }
            });
        },
        addHalfBathroom(state, action){
            const bathroom = {
                ...action.payload.halfBathroom,
                ordinal: (state.data.bathrooms?.length) ? state.data.bathrooms.length + 1 : 1,
                bathroomType: bathroomTypeValues.HALF_BATHROOM,
            };
            
            if(!Array.isArray(state.data.bathrooms)){
                state.data.bathrooms = [];
            }

            state.data.bathrooms.push(bathroom);
        },
        addRefrigeratorFreezer(state, action){
            const refrigeratorFreezer = {
                ordinal: (state.data.appliances?.length) ? state.data.appliances.length + 1 : 1,
                applianceType: action.payload.applianceType,
                manufacturer: action.payload.manufacturer,
                modelName: action.payload.modelName,
                ...action.payload.refrigeratorFreezer,
            };

            if(!Array.isArray(state.data.appliances)){
                state.data.appliances = [];
            }

            state.data.appliances.push(refrigeratorFreezer);
        },
        addCooker(state, action){

            let ovenHeatSources = [];

            if(action.payload.cooker.ovenHeatSources.gas){
                ovenHeatSources.push("Gas");
            }
            if(action.payload.cooker.ovenHeatSources.electric){
                ovenHeatSources.push("Electric");
            }
            if(action.payload.cooker.ovenHeatSources.microwave){
                ovenHeatSources.push("Microwave");
            }

            const cooker = {
                ordinal: (state.data.appliances?.length) ? state.data.appliances.length + 1 : 1,
                applianceType: action.payload.applianceType,
                manufacturer: action.payload.manufacturer,
                modelName: action.payload.modelName,
                ...action.payload.cooker,
                ovenHeatSources: ovenHeatSources,
            };

            if(!Array.isArray(state.data.appliances)){
                state.data.appliances = [];
            }

            state.data.appliances.push(cooker);
        },
        addWasher(state, action){
            const washer = {
                ordinal: (state.data.appliances?.length) ? state.data.appliances.length + 1 : 1,
                applianceType: action.payload.applianceType,
                manufacturer: action.payload.manufacturer,
                modelName: action.payload.modelName,
                ...action.payload.washer,
            };

            if(!Array.isArray(state.data.appliances)){
                state.data.appliances = [];
            }

            state.data.appliances.push(washer);
        },
        addDryer(state, action){
            const dryer = {
                ordinal: (state.data.appliances?.length) ? state.data.appliances.length + 1 : 1,
                applianceType: action.payload.applianceType,
                manufacturer: action.payload.manufacturer,
                modelName: action.payload.modelName,
                ...action.payload.dryer,
            };

            if(!Array.isArray(state.data.appliances)){
                state.data.appliances = [];
            }

            state.data.appliances.push(dryer);
        },
        addTv(state, action){
            const tv = {
                ordinal: (state.data.appliances?.length) ? state.data.appliances.length + 1 : 1,
                applianceType: action.payload.applianceType,
                manufacturer: action.payload.manufacturer,
                modelName: action.payload.modelName,
                ...action.payload.tv,
            };

            if(!Array.isArray(state.data.appliances)){
                state.data.appliances = [];
            }

            state.data.appliances.push(tv);
        },
    },
    extraReducers: (builder) => {
        builder
        
            .addCase(emailCheck.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(emailCheck.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(emailCheck.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(postalCodeCheck.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(postalCodeCheck.fulfilled, (state, action) => {
                state.loading = false;
                state.postalCodeDetail = action.payload;
            })
            .addCase(postalCodeCheck.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(phoneCheck.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(phoneCheck.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(phoneCheck.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(getAllManufacturers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllManufacturers.fulfilled, (state, action) => {
                state.loading = false;
                state.manufacturers = action.payload;
            })
            .addCase(getAllManufacturers.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export const { 
        updateStateValues, 
        validPostalCode, 
        showPhone, 
        addFullBathroom, 
        addHalfBathroom,
        addRefrigeratorFreezer,
        addCooker,
        addDryer,
        addWasher,
        addTv,
        resetState
} = householdSlice.actions;
export default householdSlice.reducer;