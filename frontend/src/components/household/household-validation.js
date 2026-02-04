import * as yup from 'yup';

export const emailValidationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Required'),
});

export const householdInfoValidationSchema = yup.object({
    postalCode: yup
        .string()
        .required('Required')
        .matches(/([0-9]{5})$/, 'Must be exactly 5 numeric characters'),
        // .test('len', 'Must be exactly 5 characters', val => val?.length === 5),
    phone: yup.lazy(value => {
        if(value !== undefined){
            return yup.object().shape({
                areaCode: yup
                    .string()
                    .required('Required')
                    .test('len', 'Must be exactly 3 characters', val => val?.length === 3),
                number: yup
                    .string()
                    .required('Required')
                    .matches(/^\(?([0-9]{3})[-]?([0-9]{4})$/, '###-#### or #######'),
                type: yup
                    .string()
                    .required('Required')
            });
        }
        return yup.mixed().notRequired();
    }),
    squareFootage: yup
        .number()
        .required('Required'),
    householdType: yup
        .string()
        .required('Required'),
    occupantCount: yup
        .number()
        .required('Required'),
    bedroomCount: yup
        .number()
        .required('Required'),

});

export const bathroomValidationSchema = yup.object({
    fullBathroom: yup.object().shape({
        commodeCount: yup
            .number()
            .required('Required'),
        sinkCount: yup
            .number()
            .required('Required'),
        bidetCount: yup
            .number()
            .required('Required'),
        bathtubCount: yup
            .number()
            .required('Required'),
        showerCount: yup
            .number()
            .required('Required'),
        tubShowerCount: yup
            .number()
            .required('Required'),
        primary: yup
            .boolean(),
    }),
    halfBathroom: yup.object().shape({
        commodeCount: yup
            .number()
            .required('Required'),
        sinkCount: yup
            .number()
            .required('Required'),
        bidetCount: yup
            .number()
            .required('Required'),
        name: yup
            .string(),
    }),
});

export const applianceValidationSchema = yup.object({
    applianceType: yup
        .string()
        .required('Required'),
    manufacturer: yup
        .string()
        .required('Required'),
    modelName: yup
        .string(),
    refrigeratorFreezer: yup.lazy(value => {
        if(value !== undefined){
            return yup.object().shape({
                refrigeratorFreezerType: yup
                    .string()
                    .required('Required'),
            });
        }
        return yup.mixed().notRequired();
    }), 
    dryer: yup.lazy(value => {
        if(value !== undefined){
            return yup.object().shape({
                heatSource: yup
                    .string()
                    .required('Required'),
            });
        }
        return yup.mixed().notRequired();
    }),
    washer: yup.lazy(value => {
        if(value !== undefined){
            return yup.object().shape({
                loadingType: yup
                    .string()
                    .required('Required'),
            });
        }
        return yup.mixed().notRequired();
    }),
    tv: yup.lazy(value => {
        if(value !== undefined){
            return yup.object().shape({
                displaySize: yup
                    .number()
                    .required('Required'),
                displayType: yup
                    .string()
                    .required('Required'),
                maxResolution: yup
                    .string()
                    .required('Required'),
            });
        }
        return yup.mixed().notRequired();
    }),
    cooker: yup.lazy(value => {
        if(value === undefined){
            return yup.mixed().notRequired();
        }

        return yup.object().shape({
            cooktopHeatSource: yup.string(),
            ovenType: yup.string(),
            ovenHeatSources: yup.object().shape({
                gas: yup.boolean(),
                electric: yup.boolean(),
                microwave: yup.boolean(),
            })
        }).test('cookerTest', ({ cooktopHeatSource, ovenType, ovenHeatSources }) => {
            if (cooktopHeatSource === undefined && ovenType === undefined) {
                return new yup.ValidationError('Please fill out the Oven or Cooktop form, or both.', null, 'cooker')
            } else if(ovenType !== undefined) {
                const { gas, electric, microwave } = ovenHeatSources
                if (!gas && !electric && !microwave) {
                    return new yup.ValidationError('At least 1 heat source needs to be selected.', null, 'ovenHeatSources')
                }
            }

        return true
        });
    }),
});