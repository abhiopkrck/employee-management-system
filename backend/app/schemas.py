from datetime import date, datetime
from decimal import Decimal

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator
)


class EmployeeBase(BaseModel):

    name: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    email: EmailStr

    phone: str

    department: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    designation: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    salary: Decimal = Field(
        ...,
        gt=0
    )

    joining_date: date

    @field_validator(
        "name",
        "department",
        "designation"
    )
    @classmethod
    def validate_text(cls, value):
        value = value.strip()

        if not value:
            raise ValueError("This field is required")

        return value

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):
        value = value.strip()

        if not value.isdigit():
            raise ValueError(
                "Phone must contain only digits"
            )

        if len(value) != 10:
            raise ValueError(
                "Phone must be a valid 10-digit number"
            )

        return value


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):

    id: int

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )