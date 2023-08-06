document.addEventListener( 'DOMContentLoaded', draw, false );
function generateValues( width ){
	const segments = ( Math.random() < 0.5 ) ? 1 + Math.floor( 9 * Math.random() ) : 200;
	const wl = width / ( 5 + ( 15 * Math.random() ) );

	return {
		segments,
		wl,
		layers: 3 + Math.floor( 10 * Math.random() ),
		hueStart: 360 * Math.random(),
		hueIncrement: 20 - ( 40 * ( Math.random() ) ),
		ampl: ( 0.1 * wl ) + ( 0.9 * wl ) * Math.random(),
		offset: width * Math.random(),
		offsetIncrement: width / 20 + ( width / 10 ) * Math.random(),
		sat: 15 + ( 35 * Math.random() ),
		light: 15 + ( 45 * Math.random() ),
		lightIncrement: ( Math.random() < 0.5 ) ? ( 2 + ( 4 * Math.random() ) ) : -( 2 + ( 4 * Math.random() ) )
	};
}

function draw(){
	const canvas = document.querySelector( 'canvas' );
	const ctx = canvas.getContext( '2d' );
	// const width = document.body.scrollWidth / 2;
	// const height = document.body.scrollHeight / 2;
	// const width = window.innerWidth;
	// const height = window.innerHeight;
	const width = 200;
	const height = 121;

	const values = generateValues( width );
	const {
		segments,
		layers,
		hueStart,
		hueIncrement,
		wl,
		ampl,
		offset,
		offsetIncrement,
		sat,
		light,
		lightIncrement
	} = values;

	// background
	ctx.fillStyle = 'hsl( ' + hueStart + ', ' + sat + '%, ' + light + '% )';
	ctx.fillRect( 0, 0, width, height );
	
	// draw the layers
	for( let l=0; l<layers; l++ ){
		let h = hueStart + ( (l+1) * hueIncrement );
		let s = sat;
		let v = light + ( (l+1) * lightIncrement );
		ctx.fillStyle = 'hsl( ' + h + ', ' + s + '%, ' + v + '% )';
		ctx.beginPath();
		let layerOffset = offset + ( offsetIncrement * l );
		let offsetY = ( (l+0.5) * ( height / layers ) );
		let startY = offsetY + ( ampl * Math.sin( layerOffset / wl ) );
		ctx.moveTo( 0, startY );
		for( let i=0; i<=segments; i++ ){
			let x = i * ( width / segments );
			ctx.lineTo( x , startY + ( ampl * Math.sin( ( layerOffset + x ) / wl ) ) );
		}
		ctx.lineTo( width, height );
		ctx.lineTo( 0, height );
		ctx.lineTo( 0, startY );
		ctx.fill();
	}
}
