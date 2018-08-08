import { EqualValidatorDirective } from './equal-validator.directive';

describe('EqualValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new EqualValidatorDirective('123','321');
    expect(directive).toBeTruthy();
  });
});
