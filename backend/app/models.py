from enum import Enum
from typing import Union, Optional

# import pydantic

from pydantic import BaseModel as PydanticBaseModel


class BaseModel(PydanticBaseModel):
    class Config:
        arbitrary_types_allowed = True


class EmailCheck(BaseModel):
    email: str


class PhoneCheck(BaseModel):
    areaCode: str
    phoneNumber: str


class PostalCodeCheck(BaseModel):
    postalCode: str


class AddData(BaseModel):
    class AddHousehold(BaseModel):
        emailAddress: str
        homeType: str
        bedrooms: int
        occupants: int
        squareFootage: int
        postalCode: str

    class AddPhone(BaseModel):
        # emailAddress: str
        areaCode: str
        phoneNumber: str
        phoneType: str

    class AddBathroom(BaseModel):
        class BathroomType(str, Enum):
            half = 'half'
            full = 'full'

        class BathroomBase(BaseModel):
            # householdEmail: str
            bathroomOrdinal: int
            commodesCount: int
            sinksCount: int
            bidetsCount: int

        class FullBathroom(BaseModel):
            # householdEmail: str
            # bathroomOrdinal: int
            bathtubCount: int
            showerCount: int
            tubShowerCount: int
            primaryBathroom: bool

        class HalfBathroom(BaseModel):
            # householdEmail: str
            # bathroomOrdinal: int
            bathroomName: Optional[str]

        bathroomBase: BathroomBase
        bathroomType: BathroomType
        bathroomOther: FullBathroom | HalfBathroom

    class AddAppliance(BaseModel):
        class ApplianceType(str, Enum):
            RefrigiratorFreezer = 'RefrigiratorFreezer'
            Dryer = 'Dryer'
            Washer = 'Washer'
            TV = 'TV'
            Cooker = 'Cooker'

        class ApplianceBase(BaseModel):
            # householdEmail: str
            applianceOrder: int
            modelName: Optional[str]
            manufacturerName: str

        class AddRefrigeratorFreezer(BaseModel):
            # householdEmail: str
            # applianceOrder: int
            refrigeratorFreezerType: str

        class AddDryer(BaseModel):
            # householdEmail: str
            # applianceOrder: int
            heatSource: str

        class AddWasher(BaseModel):
            # householdEmail: str
            # applianceOrder: int
            loadingType: str

        class AddTV(BaseModel):
            # householdEmail: str
            # applianceOrder: int
            displaySize: int
            displayType: str
            maxResolution: str

        class AddCooker(BaseModel):
            # class CookerBase(BaseModel):
            #     householdEmail: str
            #     applianceOrder: int

            class CookerData(BaseModel):
                class CookerType(str, Enum):
                    Oven = 'Oven'
                    Cooktop = 'Cooktop'

                class AddCooktop(BaseModel):
                    # householdEmail: str
                    # applianceOrder: int
                    heatSource: str

                class AddOven(BaseModel):
                    class AddOvenHeatSource(BaseModel):
                        # householdEmail: str
                        # applianceOrder: int
                        heatSource: str

                    # householdEmail: str
                    # applianceOrder: int
                    ovenType: str
                    heatSource: list[AddOvenHeatSource]

                cookerType: CookerType
                cookerItemData: AddOven | AddCooktop

            # cookerBase: CookerBase
            cookerData: list[CookerData]

        applianceType: ApplianceType
        applianceBaseData: ApplianceBase
        applianceOtherData: AddRefrigeratorFreezer | AddDryer | AddWasher | AddTV | AddCooker

    household: AddHousehold
    phone: Optional[AddPhone]
    bathroom: list[AddBathroom]
    appliance: list[AddAppliance]
