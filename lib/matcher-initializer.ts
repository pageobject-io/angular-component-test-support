import CustomMatcherResult = jasmine.CustomMatcherResult;

beforeEach(() => {
    jasmine.addMatchers({toHaveCssClass: (): any => {
        return {
            compare: (actual: any, className: any): CustomMatcherResult => {
                let classes: string = actual.getAttribute('class');
                return {
                    pass: classes.split(' ').indexOf(className) !== -1
                };
            },
            negativeCompare: (actual: any, className: any): CustomMatcherResult => {
                let classes: string = actual.getAttribute('class');
                return {
                    pass: classes.split(' ').indexOf(className) === -1
                };
            }
        };
    }});
});
