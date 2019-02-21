import { LawyerModule } from './lawyer.module';

describe('LawyerModule', () => {
  let lawyerModule: LawyerModule;

  beforeEach(() => {
    lawyerModule = new LawyerModule();
  });

  it('should create an instance', () => {
    expect(lawyerModule).toBeTruthy();
  });
});
