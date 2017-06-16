import {Type, DebugElement} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';

export class ComponentPageBase {
    protected fixture: ComponentFixture<any>;
    protected debugElement: DebugElement;
    private type: Type<any>;

    constructor(type: Type<any>) {
        this.type = type;
    }

    public init(testComponentType?: Type<any>, compilerConfiguration?: any): Promise<ComponentFixture<any>> {
        let componentType: Type<any> = ComponentPageBase.isPresent(testComponentType) ? testComponentType : this.type;

        if (compilerConfiguration) {
            TestBed.configureCompiler(compilerConfiguration);
        }

        return TestBed.compileComponents().then(() => {
            this.fixture = TestBed.createComponent(componentType);
            if (ComponentPageBase.isPresent(testComponentType)) {
                this.debugElement = this.fixture.debugElement.children[0];
            }
            return this.fixture;
        });
    }

    protected static isPresent(obj: any): boolean {
        return obj !== undefined && obj !== null;
    }

    public getFixture(): ComponentFixture<any> {
        return this.fixture;
    }

    public getDebugElement(): DebugElement {
        return this.debugElement;
    }

    public detectChanges(): void {
        this.fixture.detectChanges();
    }

    public getNativeElement(): any {
        return this.getFixture().elementRef.nativeElement;
    }

    public autoDetectChanges(): void {
        this.fixture.autoDetectChanges(true);
    }

    protected getElementsByContainingText(selector: string, text: string): any[] {
        let elements: any = this.fixture.elementRef.nativeElement.querySelectorAll(selector);
        return [].filter.call(elements, (element: Element) => {
            return RegExp(text).test(element.textContent);
        });
    }

    protected getElementsByText(selector: string, text: string): any[] {
        let elements: any = this.fixture.elementRef.nativeElement.querySelectorAll(selector);
        return [].filter.call(elements, (element: Element) => {
            return text === element.textContent;
        });
    }

    protected getElementsByValue(selector: string, text: string): any[] {
        let elements: any = this.fixture.elementRef.nativeElement.querySelectorAll(selector);
        return [].filter.call(elements, (element: any) => {
            return text === element.value;
        });
    }

    protected findChildComponent(debugElement: DebugElement, componentType: Type<any>, index: number = 0): any {
        let result: any = null;
        let i: number = 0;
        for (let child of debugElement.children) {
            if (child.componentInstance instanceof componentType) {
                result = child.componentInstance;
            } else {
                result = this.findChildComponent(child, componentType, index);
            }

            if (ComponentPageBase.isPresent(result)) {
                if (i === index) {
                    break;
                }
                i++;
            }
        }
        return result;
    }
}
