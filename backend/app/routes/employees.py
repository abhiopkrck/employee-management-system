from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .. import crud
from app.data.database import get_db
from ..schemas import (
    EmployeeCreate,
    EmployeeResponse,
    EmployeeUpdate
)


router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


@router.post(
    "/",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED
)
def create_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):
    try:

        return crud.create_employee(
            db,
            employee
        )

    except IntegrityError:

        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Employee email already exists"
        )


@router.get(
    "/",
    response_model=list[EmployeeResponse]
)
def get_employees(
    db: Session = Depends(get_db)
):

    return crud.get_employees(db)


@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse
)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = crud.get_employee(
        db,
        employee_id
    )

    if not employee:

        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


@router.put(
    "/{employee_id}",
    response_model=EmployeeResponse
)
def update_employee(
    employee_id: int,
    employee: EmployeeUpdate,
    db: Session = Depends(get_db)
):

    try:

        updated_employee = crud.update_employee(
            db,
            employee_id,
            employee
        )

        if not updated_employee:

            raise HTTPException(
                status_code=404,
                detail="Employee not found"
            )

        return updated_employee

    except IntegrityError:

        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Employee email already exists"
        )


@router.delete(
    "/{employee_id}"
)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = crud.delete_employee(
        db,
        employee_id
    )

    if not employee:

        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {
        "message": "Employee deleted successfully"
    }