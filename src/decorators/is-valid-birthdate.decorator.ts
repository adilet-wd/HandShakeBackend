import { ValidationOptions, ValidatorConstraint,ValidatorConstraintInterface, registerDecorator} from 'class-validator';
  
@ValidatorConstraint({ name: 'isValidBirthdate', async: false })

  export class IsValidBirthdateConstraint implements ValidatorConstraintInterface {
    validate(value: string) {
        const dateOfBirth = new Date(value);
        const currentDate = new Date();

        if (dateOfBirth >= currentDate) {
            return false;
        }
        
        const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
        return age >= 16 && age <= 120;
    }
  
    defaultMessage() {
      return 'Invalid birthdate';
    }
  }
  
  export function IsValidBirthdate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsValidBirthdateConstraint,
      });
    };
  }
  