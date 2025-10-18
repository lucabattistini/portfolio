// @author brunoimbrizi / http://brunoimbrizi.com

precision highp float;

uniform sampler2D uTexture;
uniform float uInvert;

varying vec2 vPUv;
varying vec2 vUv;

void main() {
	vec4 color = vec4(0.0);
	vec2 uv = vUv;
	vec2 puv = vPUv;

	// pixel color
	vec4 colA = texture2D(uTexture, puv);

	// greyscale
	float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
	
	// For light theme (uInvert = 1.0), darken the particles to make them visible on light background
	// For dark theme (uInvert = 0.0), use original greyscale
	grey = mix(grey, grey * 0.7, uInvert);
	
	vec4 colB = vec4(grey, grey, grey, 1.0);

	// circle
	float border = 0.3;
	float radius = 0.5;
	float dist = radius - distance(uv, vec2(0.5));
	float t = smoothstep(0.0, border, dist);

	// final color
	color = colB;
	color.a = t;

	gl_FragColor = color;
}