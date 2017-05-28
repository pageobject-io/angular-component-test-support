import {fakeAsync, TestModuleMetadata, TestBed, async, getTestBed} from '@angular/core/testing';
import {ComponentPageBase} from './component-page-base';
import {Injector} from '@angular/core';

export function asyncTest(pageType: any, moduleDefinition: TestModuleMetadata,
                          testFunction: (page: ComponentPageBase, injector?: Injector) => void, testComponentType?: any, compilerConfiguration?: any): (done: any) => void {
    return async(initTest(pageType, moduleDefinition, testFunction, testComponentType, compilerConfiguration));
}

export function fakeAsyncTest(pageType: any, moduleDefinition: TestModuleMetadata,
                              testFunction: (page: ComponentPageBase, injector?: Injector) => void, testComponentType?: any, compilerConfiguration?: any): () => void {
    return fakeAsync(initTest(pageType, moduleDefinition, testFunction, testComponentType, compilerConfiguration));
}

function initTest(pageType: any, moduleDefinition: TestModuleMetadata,
                  testFunction: (page: ComponentPageBase, injector?: Injector) => void, testComponentType?: any, compilerConfiguration?: any): () => void {
    return () => {
        TestBed.configureTestingModule(moduleDefinition);
        let page: ComponentPageBase = new pageType();
        page.init(testComponentType, compilerConfiguration).then(() => {
            let injector: Injector = getTestBed().get(Injector);
            testFunction(page, injector);
        });
    };
}
