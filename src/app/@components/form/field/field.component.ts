/**
 * Global Imports
 */
import { 
	Component,
	OnInit, 
	Input, 
	AfterViewInit, 
	ElementRef, 
	HostListener, 
	ViewEncapsulation } from '@angular/core';

import { 
	FormGroup, 
	AbstractControl, 
	Validators, 
	ValidatorFn } from '@angular/forms';

/**
 * JQuery Mask
 */
declare var $:any;

/**
 * Local Imports
 */
import { Valid, Field } from './field';

@Component({
	selector: 'div[tournament-custom-field]',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class FieldComponent implements OnInit, AfterViewInit {
	/**
	 * Inputs
	 */
	@Input() field:Field;
	@Input() form:FormGroup;
	public type:string;

	/**
	 * Variables
	 */
	public control:AbstractControl;

	/**
	 * Host
	 */
	@HostListener('blur', ['$event']) onChange = ($event:Event) => {
		
	};

	constructor(private elementRef:ElementRef) { }

	/**
	 * Events
	 */
	ngOnInit() {
		this.setControl();
		this.setType();
	}

	ngAfterViewInit(){
		this.activateJQueryEvents();

		if (this.type === 'phone')
			this.activatePhoneType();

		if (this.type === 'date')
			this.activateDateType();

		if (this.type === 'select') 
			this.activateSelect();

		if (this.type === 'textarea')
			this.activateTextarea();

		if (this.type === 'bin')
			this.activateBinType();

		if (this.type === 'cvv')
			this.activateCvvType();
	}

	/**
	 * Actions
	 */
	private setControl():void{
		this.control = this.form.controls[this.field.key];
	}

	private setType():void{
		this.type = this.field.type;
		if (this.field.type == "phone") this.type = "text";
		if (this.field.type == "bin") this.type = "text";
		if (this.field.type == "cvv") this.type = "text";
	}

	private activateJQueryEvents():void{
		$(this.elementRef.nativeElement)
			.find('input')
			.blur(function(){
				$(this).removeClass('invalid');
			});
	}

	private activatePhoneType():void{
		if (this.field.type == "phone")
			$(this.elementRef.nativeElement)
			.find('input')
			.mask('(+99) (000) 000-00-00');
	}

	private activateBinType():void{
		if (this.field.type == "bin")
			$(this.elementRef.nativeElement)
			.find('input')
			.mask('9999999999999999');
	}

	private activateCvvType():void{
		if (this.field.type == "cvv")
			$(this.elementRef.nativeElement)
			.find('input')
			.mask('999');
	}

	private activateDateType():void{
		if (this.field.type == "date"){
			let $element:any = $(this.elementRef.nativeElement);
			let $input:any = $element
							.find('.datepicker');

			//-- Activate Datepicker
			$input.pickadate({
				selectMonths: true,
				selectYears: 15
			});
			let datepicker:any = $input.pickadate('picker');

			//-- Pickdate js Events Binding
			let control:AbstractControl = this.control;
			datepicker.on({
				open: function() {
					$element.find('label')
							.addClass('active')
							.addClass('light');
					control.markAsPristine();
					$element.find('i.prefix').addClass('active');
					$element.find('input').attr('focus', true);
					//console.log('Datepicker opened up!');
				},
				close: function() {
					$element.find('i.prefix')
							.removeClass('active');
					$element.find('label')
							.removeClass('light');
					if (control.invalid){
						control.markAsDirty();
						$element.find('label').removeClass('active');
					}
					//console.log('Datepicker closed now', datepicker.get() == '');
				},
				render: function() {
					//console.log('Datepicker render anew');
				},
				stop: function() {
					//console.log('Datepicker stop');
				},
				set: function(dateObj) {
					if (dateObj.clear != undefined || dateObj.select as number){
						control.patchValue(new Date(dateObj.select).toLocaleDateString());
						control.markAsPristine();
						if (control.invalid){
							control.markAsDirty();
							$element.find('label').removeClass('active');
						}
					}else if (dateObj.clear == null){ 
						control.patchValue(null);
						control.markAsDirty();
						if (control.invalid){
							control.markAsDirty();
							$element.find('label').removeClass('active');
						}
					}
					//console.log('Datepicker value set', dateObj);
				}
			});
		}
	}

	private activateSelect():void{
		if (this.field.type == "select"){
			let $element:any = $(this.elementRef.nativeElement); 
			//-- Remove input (Sanity)
			$element
			.find('input')
			.remove();

			//-- Start select
			$element
			.find('select')
			.material_select();

			//-- Listen change event
			let control:AbstractControl = this.control;
			$element
			.find('select')
			.change(function(){
				control.setValue($(this).val());
			});

			//-- Set initial value
			let initialValue:any = $element.find('select').val();
			control.setValue(initialValue);

			//-- Bind input events
			$element
			.find('input.select-dropdown')
			.addClass('valid')
			.click(function(){
				$element.find('i.prefix').addClass('active');
				$element.find('label').addClass('light');
			})
			.blur(function(){
				$element.find('i.prefix').removeClass('active');
				$element.find('label').removeClass('light');
			});
		}
	}

	private activateTextarea():void{
		if (this.field.type == "textarea"){
			let $element:any = $(this.elementRef.nativeElement); 
			//-- Remove input (Sanity)
			$element
			.find('input')
			.remove();

			//-- Start textarea
			$element
			.find('textarea')
			.addClass('valid')
			.click(function(){
				$element.find('i.prefix').addClass('active');
				$element.find('label').addClass('light');
			})
			.blur(function(){
				$element.find('i.prefix').removeClass('active');
				$element.find('label').removeClass('light');
			});
		}
	}

	get isValid() {
		return this.control.valid;
	}
}
