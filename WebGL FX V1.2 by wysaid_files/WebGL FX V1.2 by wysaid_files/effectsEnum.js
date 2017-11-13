/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-24
*/

var bUseNewFrameM = true;

var effectsEnum =
[
"default-fsh",
"wave-h",
"wave-v",
"wave-h-v",
"avg-black-white",
"weighted-black-white",
"two-value-black-white",    
"negative-black-white",
"negative-image",
"avg-emboss",
"avg-blur-0.5",
"avg-blur-1.0",
"avg-detail-alpha",
"avg-detail-beta",
"avg-detail-gama",    
"avg-edge-alpha",
"avg-edge-beta",
"avg-edge-gama",
"avg-only-edge",
"avg-glass-alpha",
"avg-glass-beta",
"avg-glass-gama",
"tilt-shift-vector",
"tilt-shift-circle",
"tilt-shift",
"motion-ball",
"testing-functions"
];

var fxSouceEnum = 
[
"@ table e0_c1",//0 (old: 1)                   YB
"@ table e1_c1",//1 ..
"@ table e2_c1",//2 ..
"@ table e3_c1",//3 ..
"@ table e4_c1",//4 (old: 5)


"@ table e5_c1",//5 (old: 6)
"@ table e6_c1",//6 (old: 7)
"@ table e7_c1",//7 (old: 24)
"@ table e8_c1",//8 (old: 25)
"@ table e9_c1",//9 (old: 26)
"@ table e10_c1",//10 (old: 82)
"@ table e11_c1",//11 (old: 87)
"@ table e12_c1",//12 (old: 83)
"@ table e13_c1",//13 (old: 88)
"@ table e14_c1",//14 (old: 89)
"@ table e15_c1",//15 (old: 92)             YE


"",//16 (old: 19)               CB
"",//17 ..
"",//18 ..
"",//19 ..
"",//20 (old: 23)

"",//21 (old: 77)
"@ table e22_c1",//22 ..
"@ table e23_c1",//23 ..
"@ table e24_c1",//24 ..
"@ table e25_c1",//25 (old: 81)
"@ table e26_c1",//26 (old: 86)
"",//27 (old: 91)

"",//28 (old: 40)
"",//29 ..
"",//30 ..
"",//31 ..
"",//32 (old: 44)

"@ texture e33_t",//33 (old: 64)
"@ texture e34_t",//34 ..
"@ texture e35_t",//35 ..
"@ texture e36_t",//36 ..
"@ texture e37_t",//37 ..
"@ texture e38_t",//38 (old: 69)
"@ texture e39_t",//39
"@ texture e40_t",//40 (old: 70)
"@ texture e41_t",//41 (old: 71)

"@ texture e42_t",//42
"@ texture e43_t",//43
"@ texture e44_t",//44
"@ texture e45_t",//45
"@ texture e46_t",//46
"@ texture e47_t",//47
"@ texture e48_t",//48
"@ texture e49_t",//49
"@ texture e50_t",//50
"@ texture e51_t",//51
"@ texture e52_t",//52
"@ texture e53_t",//53
"@ texture e54_t",//54
"@ texture e55_t",//55
"@ texture e56_t",//56
"@ texture e57_t",//57
"@ texture e58_t",//58
"@ texture e59_t",//59
"@ texture e60_t",//60
"@ texture e61_t",//61
"@ texture e62_t",//62
"@ texture e63_t",//63
"@ texture e64_t",//64
"@ texture e65_t",//65
"@ texture e66_t",//66
"@ texture e67_t",//67
"@ texture e68_t",//68
"@ texture e69_t",//69
"@ texture e70_t",//70
"@ texture e71_t",//71
"@ texture e72_t",//72


"@ table e73_c1 @ table e73_c2 @ texture vtg", //73
"@ table e74_c1 @ table e74_c2 @ texture vtg", //74
"@ table e75_c1 @ table e75_c2 @ texture vtg", //75
"@ table e76_c1 @ table e76_c2 @ texture vtg", //76
"@ table e77_c1 @ table e77_c2 @ texture vtg", //77
"@ table e78_c1 @ table e78_c2 @ texture vtg", //78
"@ table e79_c1 @ table e79_c2 @ texture vtg", //79
"@ table e80_c1 @ table e80_c2 @ texture vtg", //80

"@ texture e81_t",//81 (old: 45)
"@ texture e82_t",//82 (old: 46)

"@ texture Muti_texture1-1 @ texture Muti_texture1-2 @ texture Muti_texture1-3",//83
"@ texture Muti_texture2-1 @ texture Muti_texture2-2",//84
"@ texture Muti_texture4-1 @ texture Muti_texture4-2 @ texture Muti_texture4-3",//85
"@ texture Muti_texture5-1 @ texture Muti_texture5-2 @ texture Muti_texture5-3 @ texture Muti_texture5-4 @ texture Muti_texture5-5",//86

"",//87 (old: 29)
"",//88 (old: 30)
"",//89 (old: 31)
"",//90 (old: 32)
"",//91 (old: 36)
"",//92 (old: 33)
"@ table e93_c1",//93 (old: 37)
"@ table e94_c1",//94 (old: 38)
"",//95 (old: 27)
"",//96 (old: 35)
"",//97 (old: 28)
"",//98 (old: 39)
"",//99 (old: 34)
"@ table e100_c1 @ texture vtg",//100
"@ table e101_c1 @ texture Texturize2_32",//101

"@ table e102_c1",//102
"@ table e103_c1",//103
"",//104
"@ table e105_c1",//105
"@ table e106_c1",//106
"@ table e107_c1",//107
"@ table e108_c1",//108
"@ table e109_c1",//109
"@ table e110_c1",//110

"",//111
"",//112
"@ texture e113_t",//113
"@ texture e114_t",//114
"@ texture e115_t",//115
"@ texture e116_t",//116
"@ table e117_c1",//117     YYYYYYYYYYY
"",//118 (old:17)
"@ table e119_c1",//119
"@ table e120_c1",//120
"@ table e121_c1 @ table e121_c2 @ texture Glimmer_1 @ texture Glimmer_2 @ texture Glimmer_Gina",//121
"@ table e122_c1 @ table e122_c2 @ table e122_c3 @ texture Glimmer_1 @ texture Glimmer_2",//122
"@ table e123_c1 @ table e123_c2 @ texture Kailani_1",//123
"@ table e124_c1 @ table e124_c2 @ table e124_c3 @ texture Kailani_1",//124
"@ table e125_c1 @ table e125_c2 @ table e125_c3 @ texture Kailani_1 @ texture Kailani_Slide",//125
"@ table e126_c1 @ texture Beattle @ texture Beattle_blank",//126

"@ table e127_c1 @ table e127_c2 @ texture Beattle @ texture Beattle_Gina",//127
"@ table e128_c1 @ table e128_c2 @ texture Glimmer_1 @ texture Glimmer_2 @ texture Glimmer_Slide",//128
"@ table e129_c1 @ table e129_c2 @ table e129_c3 @ texture Glimmer_1 @ texture Glimmer_2 @ texture Glimmer_Freddie",//129
"@ table e130_c1 @ table e130_c2 @ texture Beattle @ texture Beattle_blaky1 @ texture Beattle_blaky2",//130

"@ table e131_c1 @ table e131_c2 @ texture Kailani_1 @ texture Kailani_Monochrome",//131
"@ table e132_c1 @ table e132_c2 @ texture Johnny_1 @ texture Johnny_2",//132
"@ table e133_c1 @ table e133_c2 @ texture Johnny_1 @ texture Johnny_2",//133
"@ table e134_c1 @ table e134_c2 @ table e134_c3 @ texture Johnny_1 @ texture Johnny_2 @ texture Johnny_Monochrome",//134
"@ table e135_c1 @ table e135_c2 @ table e135_c3 @ texture Beattle @ texture Beattle_Floaty",//135
"@ table e136_c1 @ table e136_c2 @ table e136_c3 @ texture Beattle @ texture Beattle_Monochrome1 @ texture Beattle_Monochrome2",//136 
"@ table e137_c1 @ table e137_c2 @ table e137_c3 @ texture Kailani_1",//137
""                      ,//138
""                      ,//139
""                      ,//140
""                      ,//141
""                      ,//142
""                      ,//143
""                      ,//144
""                      ,//145
""                      ,//146
""                      ,//147
""                      ,//148
""                      ,//149
""                      ,//150
""                      ,//151
""                      ,//152
""                      ,//153
""                      ,//154
""                      ,//155
""                      ,//156
""                      ,//157
""                      ,//158
""                      ,//159
"@ table e160_c1"                      ,//160
"@ table e161_c1"                      ,//161
"@ table e162_c1"                      ,//162
"@ table e163_c1"                      ,//163
"@ table e164_c1"                      ,//164 sunset
"@ table e165_c1"                      ,//165
"@ table e166_c1"                      ,//166
"@ table e167_c1"                      ,//167
"@ table e168_c1"                      ,//168
"@ table e169_c1"                      ,//169
"@ table e170_c1"                      ,//170
"@ table e171_c1 @ table e171_c2"      ,//171
"@ table e172_c1 "                      ,//172
"@ table e173_c1"                      ,//173
"@ table e174_c1"                      ,//174
"@ texture e175_t"    ,//175£¨’˝∆¨µ˛µ◊
"@ texture e176_t"    ,//176£¨œﬂ–‘º”…Ó
"@ texture e177_t"    ,//177£¨’˝∆¨µ˛µ◊
"@ texture e178_t"    ,//178£¨’˝∆¨µ˛µ◊
"@ texture e179_t"    ,//179£¨¬À…´
"@ texture e180_t"    ,//180£¨¬À…´
"@ texture e181_t"    ,//181£¨œﬂ–‘ºıµ≠
"@ texture e182_t"    ,//182£¨’˝∆¨µ˛µ◊
"@ texture e183_t"    ,//183£¨’˝∆¨µ˛µ◊
"@ texture e184_t"    ,//184£¨µ˛º”
"@ texture e185_t"    ,//185£¨µ˛º”
"@ texture e186_t"    ,//186£¨µ˛º”
"@ texture e187_t"    ,//187£¨’˝∆¨µ˛µ◊
"@ texture e188_t"    ,//188£¨µ˛º”
"@ texture e189_t"    ,//189£¨’˝∆¨µ˛µ◊
"@ texture e190_t"    ,//190£¨µ˛º”
"",//191
"",//192
"",//193
"",//194
"",//195
"",//196
"",//197
"",//198
"",//199
"",//200
"",//201
"",//202
"",//203
"",//204
"",//205
"",//206
"",//207
"",//208
"",//209
"",//210
"",//211
"",//212
"",//213
"",//214
"",//215
"",//216
"",//217
"",//218
"",//219
"",//220
"",//221
"",//222
"",//223
"",//224
"",//225
"",//226
"",//227
"",//228
"",//229
"",//230
"",//231
"",//232
"",//233
"",//234
"",//235
"",//236
"",//237
"",//238
"",//239
"",//240
"",//241
"",//242
"",//243
"",//244
"",//245
"",//246
"",//247
"",//248
"",//249
"",//250
"",//251
"",//252
"",//253
"",//254
"",//255
"",//256
"",//257
"",//258
"",//259
"",//260
"",//261
"",//262
"",//263
"",//264
"",//265
"",//266
"",//267
"",//268
"",//269
"",//270
"",//271
"",//272
"",//273
"",//274
"",//275
"",//276
"",//277
"",//278
"",//279
"",//280
"",//281
"",//282
"",//283
"",//284
"",//285
"",//286
"",//287
"",//288
"",//289
"",//290
"",//291
"",//292
"",//293
"",//294
"",//295
"",//296
"",//297
"",//298
"",//299
"@ table e300_c1 @ table e300_c2",         //300
"@ table e301_c1",                    //301
"",                           //302
"@ table e303_c1",                    //303
"@ table e304_c1",    //304
"",                   //305
"@ table e306_c1",                    //306
"",                   //307
"table e308_c2 @ texture e308_t1 @ texture e308_t2",                      //308
"",                   //309
"@ table e310_c1 @ texture e310_t",                   //310
"",                   //311
"",                   //312
"@ texture vtg313 @ table e313_c1",                   //313
"",                   //314
"@ table e315_c1  @ texture e315_t",                      //315
"@ table e316_c1",                    //316
"",                   //317
"@ table e318_c1",                    //318
"@ table e319_c1",                   //319
"",                   //320
"",               //321
"",                   //322
"",                   //323
"@ table e324_c1",                    //324
"@ texture e325_t",                   //325
"@ table e326_c1 @ table e326_c2",                    //326
"",                   //327
"",                   //328
"@ texture e329_t1 @ table e329_c1 @ table e329_c2 @ texture e329_t2",                    //329
"@ table e330_c1 @ texture e330_t1 @ texture e330_t2 @ texture e330_t3 @ texture e330_t4 @ texture e330_t5 @ texture e330_t6 @ texture e330_t7",                     //330
"",                   //331
"",                   //332
"",                   //333
"@ table e334_c1 @ texture e334_t1 @ texture e334_t2 @ texture e334_t3 @ texture e334_t4 @ texture e334_t5 @ texture e334_t6",                    //334
"@ table e335_c1 @ table e335_c2 @ table e335_c3 @ texture e335_t1 @ texture e335_t2 @ texture e335_t3 @ texture e335_t4",                    //335
"@ texture e336_t1 @ table e336_c1 @ texture e336_t2",                    //336
"",                   //337
"@ table e338_c1 @ texture e338_t1 @ texture e338_t2 @ texture e338_t3",                      //338
"@ table e339_c1 @ texture e339_t1 @ texture e339_t2 @ texture e339_t3 ",                     //339
"",                   //340
"@ table e341_c1",                    //341
"@ table e342_c1",                    //342, …´≤ ∆Ω∫‚Œ¥ µœ÷
"",                   //343
"@ table e344_c1",                    //344, …´≤ ∆Ω∫‚Œ¥ µœ÷
"@ table e345_c1",                    //345
"",                   //346
"@ table e347_c1",                    //347
"@ texture e348_t.png @ table e348_c1",                   //348
////////////////////////////////////////////////////////////////////////// ≥¬”ÓÃ·≥ˆµƒ10∏ˆ∫⁄∞◊Œ∆¿ÌÃÿ–ß
"@ texture e349_t",    //349
"@ texture e350_t",    //350
"@ texture e351_t",    //351
"@ texture e352_t",    //352
"@ texture e353_t",    //353
"@ texture e354_t",    //354
"@ texture e355_t",    //355
"@ texture e356_t",    //356
"@ texture e357_t",    //357
"@ texture e358_t",    //358
//////////////////////////////
"@ texture e359_t",                   //359
"@ texture e360_t1 @ texture e360_t2",                    //360
"@ texture e361_t",                   //361
"@ texture e362_t",                   //362
"@ texture e363_t",                   //363
"@ texture e364_t",                   //364
//////////////
"@ texture e365_t1",                      //365
"@ texture e366_t1 @ texture e366_t2",                    //366
"@ texture e367_t1 @ texture e367_t2",                    //367
"@ texture e368_t1",                      //368
"@ texture e369_t1 @ texture e369_t2",                    //369
"@ texture e370_t1 @ texture e370_t2",                    //370
"@ texture e371_t1 @ texture e371_t2",                    //371
"@ texture e372_t1 @ texture e372_t2",                    //372
"@ texture e373_t1 @ texture e373_t2",                    //373
"@ texture e374_t1 @ texture e374_t2",                     //374
"@ texture e375_t1 @ texture e375_t2",                      //375
"@ texture e376_t1 @ texture e376_t2",                      //376
"@ texture e377_t1 @ texture e377_t2",                   //377
"@ texture e378_t1 @ texture e378_t2",                      //378
"@ texture e379_t1",                      //379
"@ texture e380_t1",                      //380
"@ texture e381_t1 @ texture e381_t2",                    //381
"@ texture e382_t1 @ texture e382_t2",                    //382
"@ texture e383_t1 @ texture e383_t2",                    //383
"@ texture e384_t1 @ texture e384_t2",                    //384
"@ texture e385_t1 @ texture e385_t2",                    //385
"@ texture e386_t1 @ texture e386_t2",                    //386
"@ texture e387_t1 @ texture e387_t2",                    //387
"@ texture e388_t1 @ texture e388_t2",                    //388
"@ texture e389_t1 @ texture e389_t2",                    //389
"@ texture e390_t1 @ texture e390_t2",                    //390
"@ texture e391_t1 @ texture e391_t2 @ texture e391_t3",                      //391
"@ texture e392_t1 @ texture e392_t2",                    //392
"@ texture e393_t1",                      //393
"@ texture e394_t1 @ texture e394_t2",                    //394
"@ texture e395_t1 @ texture e395_t2",                    //395
"@ texture e396_t1",                      //396
"@ texture e397_t1",                      //397
"@ table e398_c1 @ table e398_c2" ,//398 Portrait Start
"@ table e399_c1 @ table e399_c2" ,//399
"@ table e400_c1 @ table e400_c2" ,//400
"@ table e401_c1" ,//401

//New "Black&White fx" -- from 402 to 414.
" @ table e402_c1 @ texture e402_t",//402
" @ table e403_c1 @ texture e403_t",//403
" @ table e404_c1 @ texture e404_t",//404
" @ table e405_c1 @ texture e405_t",//405
" @ table e406_c1",//406
" @ table e407_c1 @ texture e407_t",//407
" @ table e408_c1 @ texture e408_t",//408
" @ table e409_c1 @ texture e403_t",//409
" @ table e410_c1 @ texture e410_t",//410
" @ table e411_c1 @ texture e405_t",//411
" @ table e412_c1 @ texture e405_t",//412
" @ table e413_c1 @ texture e403_t",//413
" @ table e414_c1 @ texture e402_t",//414

//Face effect -- from 415 to 438

"@ table e415_c1"   ,//415
"@ table e416_c1"   ,//416
"@ table e417_c1"   ,//417
"@ table e418_c1"   ,//418
"@ table e419_c1"   ,//419
"@ table e420_c1"   ,//420
"@ table e421_c1"   ,//421
"@ table e422_c1"   ,//422
"@ table e423_c1"   ,//423
"@ table e424_c1 @ texture e424_t"   ,//424
""   ,//425
""   ,//426

//////////////////////////////////////////////////////////////////////////
"@ texture e427_t",//427
"@ texture e428_t",//428
"@ texture e429_t",//429
"@ texture e430_t",//430
"@ texture e431_t",//431
"@ texture e432_t",//432
"",//433
"",//434
"@ table e435_c1",//435
"@ table e436_c1",//436
"@ table e437_c1",//437
"@ table e438_c1",//438

//PES effect -- from 439 to 458
"@ table e439_c1 @ texture e439_t1 @ texture e439_t2",//439
"@ texture e440_t1 @ texture e440_t2",//440
"@ texture e441_t2 @ texture e441_t1 @ table e441_c1",//441
"@ table e442_c1 @ texture e442_t2 @ texture e442_t1",//442
"@ table e443_c1 @ texture e443_t2 @ texture e443_t1",//443
"@ table e444_c1 @ texture e444_t1 @ texture e444_t2",//444
"@ table e445_c1 @ texture e445_t2 @ texture e445_t1",//445
"@ table e446_c1 @ texture e446_t",//446
"@ table e447_c1 @ texture e447_t1 @ texture e447_t2",//447
"@ table e448_c1 @ texture e448_t1 @ texture e448_t2",//448
//////////////////////////////////////////////////////////////////////////
"@ texture e449_t1 @ texture e449_t2",//449
"@ table e450_c1  @ texture e450_t1 @ texture e450_t2",//450
"@ texture e451_t2 @ texture e451_t1 @ table e451_c1",//451
"@ table e452_c1 @ texture e452_t1 @ texture e452_t2",//452
"@ table e453_c1 @ texture e453_t1 @ texture e453_t2",//453
"@ table e454_c1 @ texture e454_t2 @ texture e454_t1",//454
"@ table e455_c1 @ texture e455_t2 @ texture e455_t1",//455
"@ table e456_c1 @ texture e456_t2 @ texture e456_t1",//456
"@ table e457_c1 @ texture e457_t2 @ texture e457_t1",//457
"@ texture e458_t2 @ texture e458_t1",//458
"@ table e459_c1 @ texture e402_t" ,//459

"@ table e460_c1 @ texture e460_t", //460
"@ table e461_c1 @ texture e461_t", //461
"@ table e462_c1 @ texture e462_t", //462
"@ table e463_c1 @ texture e463_t", //463
"@ table e464_c1 @ texture e464_t", //464
"@ table e465_c1 @ texture e465_t", //465
"@ table e466_c1 @ texture e460_t", //466
"@ table e467_c1 @ texture e461_t", //467
"@ table e468_c1 @ texture e465_t", //468
"@ table e469_c1 @ texture e469_t", //469
"@ table e470_c1 @ texture e460_t", //470
"@ table e471_c1 @ texture e460_t", //471
"@ texture e472_t",                            //472
"@ texture e473_t",    //473
"@ texture e474_t",    //474
"@ texture e475_t",    //475
"@ texture e476_t",    //476
"@ texture e477_t",    //477
"@ texture e478_t",    //478
"@ texture e479_t",    //479
"@ texture e480_t",    //480
"@ texture e481_t",    //481
];

var fxShaderEnum = 
[
"lomo_FragmentShaderString",  //0
"lomo_FragmentShaderString",  //1
"lomo_FragmentShaderString",  //2
"lomo_FragmentShaderString",  //3
"lomo_FragmentShaderString",  //4
"lomo2_FragmentShaderString", //5
"lomo2_FragmentShaderString", //6
"lomo2_FragmentShaderString", //7
"lomo2_FragmentShaderString", //8
"lomo2_FragmentShaderString", //9
"lomo2_FragmentShaderString", //10
"lomo2_FragmentShaderString", //11
"lomo2_FragmentShaderString", //12
"lomo2_FragmentShaderString", //13
"lomo2_FragmentShaderString", //14
"lomo2_FragmentShaderString", //15

"color_e16_FragmentShaderString", //16
"color_e17_FragmentShaderString", //17
"color_e18_FragmentShaderString", //18
"color_e19_FragmentShaderString", //19
"color_e20_FragmentShaderString", //20
"color2_e21_FragmentShaderString", //21
"color2_e22_FragmentShaderString", //22
"color2_e23_FragmentShaderString", //23
"color2_e24_FragmentShaderString", //24
"color2_e25_FragmentShaderString", //25
"color2_e26_FragmentShaderString", //26
"color2_e27_FragmentShaderString", //27

"bw_e28_FragmentShaderString",    //28
"bw_e29_FragmentShaderString",    //29
"bw_e30_FragmentShaderString",    //30
"bw_e30_FragmentShaderString",    //31
"bw_e30_FragmentShaderString",    //32
"texture_e33_FragmentShaderString",   //33
"texture_e34_FragmentShaderString",   //34
"texture_e35_FragmentShaderString",   //35
"texture_e36_FragmentShaderString",   //36
"texture_e37_FragmentShaderString",   //37
"texture_e38_FragmentShaderString",   //38
"texture_e39_FragmentShaderString",   //39
"texture_e40_FragmentShaderString",   //40

"texture_e41_FragmentShaderString",   //41
"texture_e42_FragmentShaderString",   //42
"texture_e43_FragmentShaderString",   //43
"texture_e44_FragmentShaderString",   //44
"texture_e45_FragmentShaderString",   //45
"texture_e46_FragmentShaderString",   //46
"texture_e47_FragmentShaderString",   //47
"texture_e48_FragmentShaderString",   //48
"texture_e49_FragmentShaderString",   //49
"texture_e50_FragmentShaderString",   //50
"texture_e51_FragmentShaderString",   //51
"texture_e52_FragmentShaderString",   //52
"texture_e53_FragmentShaderString",   //53
"texture_e54_FragmentShaderString",   //54
"texture_e55_FragmentShaderString",   //55
"texture_e56_FragmentShaderString",   //56
"texture_e57_FragmentShaderString",   //57
"texture_e58_FragmentShaderString",   //58
"texture_e59_FragmentShaderString",   //59
"texture_e60_FragmentShaderString",   //60
"texture_e61_FragmentShaderString",   //61
"texture_e62_FragmentShaderString",   //62
"texture_e63_FragmentShaderString",   //63
"texture_e64_FragmentShaderString",   //64
"texture_e65_FragmentShaderString",   //65
"texture_e66_FragmentShaderString",   //66
"texture_e67_FragmentShaderString",   //67
"texture_e68_FragmentShaderString",   //68
"texture_e69_FragmentShaderString",   //69
"texture_e70_FragmentShaderString",   //70
"texture_e71_FragmentShaderString",   //71
"texture_e72_FragmentShaderString",   //72

"Effect_texture_toaster_FragemntShaderString",      //73
"Effect_texture_earlybird_FragmentShaderString",      //74
"texture2_FragmentShaderString",      //75
"Effect_texture_brannan_FragmentShaderString",      //76
"texture2_FragmentShaderString",      //77
"texture2_FragmentShaderString",      //78
"Effect_texture_apolloX_FragmentShaderString",      //79
"texture2_FragmentShaderString",      //80

"bw_e81_FragmentShaderString",        //81
"bw_e81_FragmentShaderString",        //82

"Multi_Texture83_FragmentShaderString",   //83
"Multi_Texture84_FragmentShaderString",   //84
"Multi_Texture85_FragmentShaderString",   //85
"Multi_Texture86_FragmentShaderString",   //86

"ColorEffect_e87_FragmentShaderString",   //87  technicolor3
"ColorEffect_e88_FragmentShaderString",   //88  emboss with color, 
"ColorEffect_e89_FragmentShaderString",   //89  emboss without color, 
"ColorEffect_e90_FragmentShaderString",   //90  color_gradient with color_by, 
"ColorEffect_e91_FragmentShaderString",   //91  technicolor1 & vigetAmount & vigetMidPointValue
"ColorEffect_e92_FragmentShaderString",   //92  
"lomo_FragmentShaderString",   //93
"lomo_FragmentShaderString",   //94
"ColorEffect_e95_FragmentShaderString",   //95
"ColorEffect_e96_FragmentShaderString",   //96
"ColorEffect_e97_FragmentShaderString",   //97
"ColorEffect_e98_FragmentShaderString",   //98
"ColorEffect_e99_FragmentShaderString",   //99

"Effect100_Fragment_ShaderString",   //100
"Effect101_Fragment_ShaderString",   //101

"lomo2_FragmentShaderString",     //102
"lomo2_FragmentShaderString",     //103

"Effect104_Fragment_ShaderString",    //104
"lomo_FragmentShaderString",    //105
"lomo_FragmentShaderString",    //106
"lomo_FragmentShaderString",    //107
"lomo_FragmentShaderString",    //108
"lomo_FragmentShaderString",    //109
"lomo_FragmentShaderString",    //110
"bw_e111_FragmentShaderString", //111
"vignette_bw_FragmentShaderString",   //112
"texture_e113_FragmentShaderString",  //113
"texture_e114_FragmentShaderString",  //114
"texture_e115_FragmentShaderString",  //115
"texture_e116_FragmentShaderString",  //116
"lomo2_FragmentShaderString",     //117
"vignette_e118_FragmentShaderString", //118
"Effect_baw_Fragment_ShaderString",   //119
"Effect_baw_Fragment_ShaderString",   //120

"Effect_glimer_gina_Fragment_ShaderString",   //121
"Effect_glimer_kodat_Fragment_ShaderString",  //122
"Effect_kailani_blank_Fragment_ShaderString", //123
"Effect_kailani_kodak_Fragment_ShaderString", //124
"Effect_kailani_slide_Fragment_ShaderString", //125
"Effect_beattle_blank_Fragment_ShaderString", //126
"Effect_beattle_gina_Fragment_ShaderString",  //127
"Effect_glimer_slide_Fragment_ShaderString",  //128
"Effect_glimer_freddie_Fragment_ShaderString",    //129 
"Effect_beattle_blaky_Fragment_ShaderString", //130
"Effect_kailani_monochrome_Fragment_ShaderString", //131
"Effect_johnny_blacky_Fragment_ShaderString",     //132
"Effect_johnny_blank_Fragment_ShaderString",      //133
"Effect_johnny_monochrome_Fragment_ShaderString",  //134
"Effect_beattle_floaty_Fragment_ShaderString",        //135
"Effect_beattle_monochrome_Fragment_ShaderString",    //136
"Effect_kailani_floaty_Fragment_ShaderString",        //137
"nil", //138
"nil", //139
"nil", //140
"nil", //141
"nil", //142
"nil", //143
"nil", //144
"nil", //145
"nil", //146
"nil", //147
"nil", //148
"nil", //149
"nil", //150
"nil", //151
"nil", //152
"nil", //153
"nil", //154
"nil", //155
"nil", //156
"nil", //157
"nil", //158
"nil", //159
"Effect_only_1table_Fragment_ShaderString", //160
"Effect_only_1table_Fragment_ShaderString", //161
"Effect_only_1table_Fragment_ShaderString", //162
"Effect_only_1table_Fragment_ShaderString", //163
"Effect_only_1table_Fragment_ShaderString", //164
"Effect_only_1table_Fragment_ShaderString", //165
"Effect_only_1table_Fragment_ShaderString", //166
"Effect_only_1table_Fragment_ShaderString", //167
"Effect_only_1table_Fragment_ShaderString", //168
"Effect_only_1table_Fragment_ShaderString", //169
"Effect_only_1table_Fragment_ShaderString", //170
"Effect_only_2table_Fragment_ShaderString", //171
"Effect_only_1table_Fragment_ShaderString", //172
"Effect_only_1table_Fragment_ShaderString", //173
"Effect_only_1table_Fragment_ShaderString", //174
"Effect_texture_multiply_Fragment_ShaderString",      //175
"Effect_texture_linear_burn_Fragment_ShaderString",   //176
"Effect_texture_multiply_Fragment_ShaderString",      //177
"Effect_texture_multiply_Fragment_ShaderString",      //178
"Effect_texture_screen_Fragment_ShaderString",        //179
"Effect_texture_screen_Fragment_ShaderString",        //180
"Effect_texture_linear_dodge_Fragment_ShaderString",  //181
"Effect_texture_multiply_Fragment_ShaderString",      //182
"Effect_texture_multiply_Fragment_ShaderString",      //183
"Effect_texture_overlay_Fragment_ShaderString",       //184
"Effect_texture_overlay_Fragment_ShaderString",       //185
"Effect_texture_overlay_Fragment_ShaderString",       //186
"Effect_texture_multiply_Fragment_ShaderString",      //187
"Effect_texture_overlay_Fragment_ShaderString",       //188
"Effect_texture_multiply_Fragment_ShaderString",      //189
"Effect_texture_overlay_Fragment_ShaderString",       //190
"nil", //191
"nil", //192
"nil", //193
"nil", //194
"nil", //195
"nil", //196
"nil", //197
"nil", //198
"nil", //199
"nil", //200
"nil", //201
"nil", //202
"nil", //203
"nil", //204
"nil", //205
"nil", //206
"nil", //207
"nil", //208
"nil", //209
"nil", //210
"nil", //211
"nil", //212
"nil", //213
"nil", //214
"nil", //215
"nil", //216
"nil", //217
"nil", //218
"nil", //219
"nil", //220
"nil", //221
"nil", //222
"nil", //223
"nil", //224
"nil", //225
"nil", //226
"nil", //227
"nil", //228
"nil", //229
"nil", //230
"nil", //231
"nil", //232
"nil", //233
"nil", //234
"nil", //235
"nil", //236
"nil", //237
"nil", //238
"nil", //239
"nil", //240
"nil", //241
"nil", //242
"nil", //243
"nil", //244
"nil", //245
"nil", //246
"nil", //247
"nil", //248
"nil", //249
"nil", //250
"nil", //251
"nil", //252
"nil", //253
"nil", //254
"nil", //255
"nil", //256
"nil", //257
"nil", //258
"nil", //259
"nil", //260
"nil", //261
"nil", //262
"nil", //263
"nil", //264
"nil", //265
"nil", //266
"nil", //267
"nil", //268
"nil", //269
"nil", //270
"nil", //271
"nil", //272
"nil", //273
"nil", //274
"nil", //275
"nil", //276
"nil", //277
"nil", //278
"nil", //279
"nil", //280
"nil", //281
"nil", //282
"nil", //283
"nil", //284
"nil", //285
"nil", //286
"nil", //287
"nil", //288
"nil", //289
"nil", //290
"nil", //291
"nil", //292
"nil", //293
"nil", //294
"nil", //295
"nil", //296
"nil", //297
"nil", //298
"nil", //299
"Effect300_Fragment_ShaderString",    //300
"Effect301_Fragment_ShaderString",    //301
"nil",    //302
"Effect_only_1table_Fragment_ShaderString",  //303
"Effect304_Fragment_ShaderString",    //304
"nil",    //305
"Effect_only_1table_Fragment_ShaderString",  //306
"nil",    //307
"Effect308_Fragment_ShaderString",    //308
"nil",    //309
"Effect310_Fragment_ShaderString",    //310
"nil",    //311
"nil",    //312
"Effect313_Fragment_ShaderString",    //313
"nil",    //314
"Effect315_Fragment_ShaderString",    //315
"Effect316_Fragment_ShaderString",    //316
"nil",    //317
"Effect_only_1table_Fragment_ShaderString",  //318
"Effect316_Fragment_ShaderString",    //319
"nil",    //320
"Effect321_Fragment_ShaderString",    //321
"Effect322_Fragment_ShaderString",    //322
"Effect323_Fragment_ShaderString",    //323
"Effect324_Fragment_ShaderString",    //324
"Effect325_Fragment_ShaderString",    //325
"Effect326_Fragment_ShaderString",    //326
"nil",    //327
"nil",    //328
"Effect329_Fragment_ShaderString",    //329
"Effect330_Fragment_ShaderString",    //330
"nil",    //331
"nil",    //332
"nil",    //333
"Effect334_Fragment_ShaderString",    //334
"Effect335_Fragment_ShaderString",    //335
"Effect336_Fragment_ShaderString",    //336
"nil",    //337
"Effect338_Fragment_ShaderString",    //338
"Effect339_Fragment_ShaderString",    //339
"nil",    //340
"Effect341_Fragment_ShaderString",    //341
"Effect342_Fragment_ShaderString",    //342
"nil",    //343
"Effect344_Fragment_ShaderString",    //344
"Effect345_Fragment_ShaderString",    //345
"nil",    //346
"Effect347_Fragment_ShaderString",    //347
"Effect348_Fragment_ShaderString",    //348
"Effect_texture_overlay_Fragment_ShaderString",   //349
"Effect_texture_overlay_Fragment_ShaderString",   //350
"Effect_texture_overlay_Fragment_ShaderString",   //351
"Effect_texture_overlay_Fragment_ShaderString",   //352
"Effect_texture_screen_Fragment_ShaderString",    //353
"Effect_texture_screen_Fragment_ShaderString",    //354
"Effect_texture_linear_dodge_Fragment_ShaderString",  //355
"Effect_texture_overlay_Fragment_ShaderString",   //356
"Effect_texture_linear_burn_Fragment_ShaderString",   //357
"Effect_texture_overlay_Fragment_ShaderString",   //358

"Effect359_Fragment_ShaderString",    //359
"Effect360_Fragment_ShaderString",    //360
"Effect361_Fragment_ShaderString",    //361
"Effect_texture_screen_Fragment_ShaderString",    //362
"Effect_texture_linear_dodge_Fragment_ShaderString",  //363
"Effect364_Fragment_ShaderString",    //364
"Effect_texture_screen_Fragment_ShaderString",    //365
"Effect366_Fragment_ShaderString",    //366
"Effect367_Fragment_ShaderString",    //367
"Effect_texture_screen_Fragment_ShaderString",    //368
"Effect369_Fragment_ShaderString",    //369
"Effect370_Fragment_ShaderString",    //370
"Effect371_Fragment_ShaderString",    //371
"Effect372_Fragment_ShaderString",    //372
"Effect373_Fragment_ShaderString",    //373
"Effect374_Fragment_ShaderString",    //374
"Effect375_Fragment_ShaderString",    //375
"Effect376_Fragment_ShaderString",    //376
"Effect377_Fragment_ShaderString",    //377
"Effect378_Fragment_ShaderString",    //378
"Effect_texture_screen_Fragment_ShaderString",    //379
"Effect_texture_screen_Fragment_ShaderString",    //380
"Effect381_Fragment_ShaderString",    //381
"Effect382_Fragment_ShaderString",    //382
"Effect383_Fragment_ShaderString",    //383
"Effect384_Fragment_ShaderString",    //384
"Effect385_Fragment_ShaderString",    //385
"Effect386_Fragment_ShaderString",    //386
"Effect387_Fragment_ShaderString",    //387
"Effect388_Fragment_ShaderString",    //388
"Effect389_Fragment_ShaderString",    //389
"Effect390_Fragment_ShaderString",    //390
"Effect391_Fragment_ShaderString",    //391
"Effect392_Fragment_ShaderString",    //392
"Effect_texture_color_dodge_Fragment_ShaderString",   //393
"Effect394_Fragment_ShaderString",    //394
"Effect395_Fragment_ShaderString",    //395
"Effect_texture_linear_dodge_Fragment_ShaderString",  //396
"Effect_texture_color_dodge_Fragment_ShaderString",   //397
"Effect_only_2table_Fragment_ShaderString",   //398
"Effect_only_2table_Fragment_ShaderString",   //399
"Effect_only_2table_Fragment_ShaderString",   //400
"Effect401_Fragment_ShaderString",    //401
"Effect402_Fragment_ShaderString",    //402
"Effect403_Fragment_ShaderString",    //403
"Effect404_Fragment_ShaderString",    //404
"Effect405_Fragment_ShaderString",    //405
"Effect406_Fragment_ShaderString",    //406
"Effect407_Fragment_ShaderString",    //407
"Effect408_Fragment_ShaderString",    //408
"Effect409_Fragment_ShaderString",    //409
"Effect410_Fragment_ShaderString",    //410
"Effect411_Fragment_ShaderString",    //411
"Effect412_Fragment_ShaderString",    //412
"Effect413_Fragment_ShaderString",    //413
"Effect414_Fragment_ShaderString",    //414

"Effect415to417_Fragment_ShaderString",    //415
"Effect415to417_Fragment_ShaderString",    //416
"Effect415to417_Fragment_ShaderString",    //417
"Effect418to420_Fragment_ShaderString",    //418
"Effect418to420_Fragment_ShaderString",    //419
"Effect418to420_Fragment_ShaderString",    //420
"Effect421to422_Fragment_ShaderString",    //421
"Effect421to422_Fragment_ShaderString",    //422
"Effect423_Fragment_ShaderString",    //423
"Effect_1table_softLight_Fragment_ShaderString",    //424
"Effect425_Fragment_ShaderString",    //425
"Effect426_Fragment_ShaderString",    //426
"Effect_texture_vivid_light_Fragment_ShaderString",    //427
"Effect_texture_screen_Fragment_ShaderString",    //428
"Effect_texture_overlay_Fragment_ShaderString",    //429
"Effect_texture_screen_Fragment_ShaderString",    //430
"Effect_texture_hard_light_Fragment_ShaderString",    //431
"Effect_texture_soft_light_Fragment_ShaderString",    //432
"Effect433_Fragment_ShaderString",    //433
"Effect434_Fragment_ShaderString",    //434
"Effect_blackwhite_1table_Fragment_ShaderString",    //435
"Effect_blackwhite_1table_Fragment_ShaderString",    //436
"Effect_blackwhite_1table_Fragment_ShaderString",    //437
"Effect_blackwhite_1table_Fragment_ShaderString",    //438

"Effect439_Fragment_ShaderString",    //439
"Effect440_Fragment_ShaderString",    //440
"Effect441_Fragment_ShaderString",    //441
"Effect442_Fragment_ShaderString",    //442
"Effect443_Fragment_ShaderString",    //443
"Effect444_Fragment_ShaderString",    //444
"Effect445_Fragment_ShaderString",    //445
"Effect_1table_colorBurn_Fragment_ShaderString",    //446
"Effect447_Fragment_ShaderString",    //447
"Effect448_Fragment_ShaderString",    //448
"Effect449_Fragment_ShaderString",    //449
"Effect450_Fragment_ShaderString",    //450
"Effect451_Fragment_ShaderString",    //451
"Effect452_Fragment_ShaderString",    //452
"Effect453_Fragment_ShaderString",    //453
"Effect454_Fragment_ShaderString",    //454
"Effect455_Fragment_ShaderString",    //455
"Effect456_Fragment_ShaderString",    //456
"Effect457_Fragment_ShaderString",    //457
"Effect458_Fragment_ShaderString",    //458
"Effect459_Fragment_ShaderString",    //459

"Effect460to471_Fragment_ShaderString",    //460
"Effect460to471_Fragment_ShaderString",    //461
"Effect460to471_Fragment_ShaderString",    //462
"Effect460to471_Fragment_ShaderString",    //463
"Effect460to471_Fragment_ShaderString",    //464
"Effect460to471_Fragment_ShaderString",    //465
"Effect460to471_Fragment_ShaderString",    //466
"Effect460to471_Fragment_ShaderString",    //467
"Effect460to471_Fragment_ShaderString",    //468
"Effect460to471_Fragment_ShaderString",    //469
"Effect460to471_Fragment_ShaderString",    //470
"Effect460to471_Fragment_ShaderString",    //471
"Effect_texture_overlay_Fragment_ShaderString",   //472
"Effect_texture_overlay_Fragment_ShaderString",   //473
"Effect_texture_overlay_Fragment_ShaderString",   //474
"Effect_texture_overlay_Fragment_ShaderString",   //475
"Effect_texture_screen_Fragment_ShaderString",    //476
"Effect_texture_screen_Fragment_ShaderString",    //477
"Effect_texture_linear_dodge_Fragment_ShaderString",  //478
"Effect_texture_overlay_Fragment_ShaderString",   //479
"Effect_texture_linear_burn_Fragment_ShaderString",   //480
"Effect_texture_overlay_Fragment_ShaderString",   //481

];

var fxNum = fxShaderEnum.length;

var frameDefEnum =
[
"", //0
"M 231 231 @ 1M_0 0 0 115 115 @ 1M_1 115 0 1 115 @ 1M_2 116 0 115 115 @ 1M_3 116 115 115 1 @ 1M_4 116 116 115 115 @ 1M_5 115 116 1 115 @ 1M_6 0 116 115 115 @ 1M_7 0 115 115 1 ", //1
"M 133 133 @ 2M_0 0 0 66 66 @ 2M_1 66 0 1 66 @ 2M_2 67 0 66 66 @ 2M_3 67 66 66 1 @ 2M_4 67 67 66 66 @ 2M_5 66 67 1 66 @ 2M_6 0 67 66 66 @ 2M_7 0 66 66 1 ", //2
"M 161 161 @ 3M_0 0 0 80 80 @ 3M_1 80 0 1 80 @ 3M_2 81 0 80 80 @ 3M_3 81 80 80 1 @ 3M_4 81 81 80 80 @ 3M_5 80 81 1 80 @ 3M_6 0 81 80 80 @ 3M_7 0 80 80 1 ", //3
"M 212 212 @ 4M_0 0 0 82 82 @ 4M_1 82 0 48 82 @ 4M_2 130 0 82 82 @ 4M_3 130 82 82 48 @ 4M_4 130 130 82 82 @ 4M_5 82 130 48 82 @ 4M_6 0 130 82 82 @ 4M_7 0 82 82 48 ", //4
"M 212 212 @ 5M_0 0 0 82 82 @ 5M_1 82 0 48 82 @ 5M_2 130 0 82 82 @ 5M_3 130 82 82 48 @ 5M_4 130 130 82 82 @ 5M_5 82 130 48 82 @ 5M_6 0 130 82 82 @ 5M_7 0 82 82 48 ", //5
"M 229 229 @ 6M_0 0 0 93 93 @ 6M_1 93 0 43 93 @ 6M_2 136 0 93 93 @ 6M_3 136 93 93 43 @ 6M_4 136 136 93 93 @ 6M_5 93 136 43 93 @ 6M_6 0 136 93 93 @ 6M_7 0 93 93 43 ", //6
"M 264 264 @ 7M_0 0 0 112 112 @ 7M_1 112 0 40 112 @ 7M_2 152 0 112 112 @ 7M_3 152 112 112 40 @ 7M_4 152 152 112 112 @ 7M_5 112 152 40 112 @ 7M_6 0 152 112 112 @ 7M_7 0 112 112 40", //7
"S ", //8
"M 270 270 @ 9M_0 0 0 110 110 @ 9M_1 110 0 50 110 @ 9M_2 160 0 110 110 @ 9M_3 160 110 110 50 @ 9M_4 160 160 110 110 @ 9M_5 110 160 50 110 @ 9M_6 0 160 110 110 @ 9M_7 0 110 110 50 ", //9
"M 174 174 @ 10M_0 0 0 72 72 @ 10M_1 72 0 30 72 @ 10M_2 102 0 72 72 @ 10M_3 102 72 72 30 @ 10M_4 102 102 72 72 @ 10M_5 72 102 30 72 @ 10M_6 0 102 72 72 @ 10M_7 0 72 72 30 ", //10
"M 77 77 @ 11M_0 0 0 38 38 @ 11M_1 38 0 1 38 @ 11M_2 39 0 38 38 @ 11M_3 39 38 38 1 @ 11M_4 39 39 38 38 @ 11M_5 38 39 1 38 @ 11M_6 0 39 38 38 @ 11M_7 0 38 38 1 ", //11
"M 396 396 @ 12M_0 0 0 153 153 @ 12M_1 153 0 90 153 @ 12M_2 243 0 153 153 @ 12M_3 243 153 153 90 @ 12M_4 243 243 153 153 @ 12M_5 153 243 90 153 @ 12M_6 0 243 153 153 @ 12M_7 0 153 153 90 ", //12
"M 249 249 @ 13M_0 0 0 124 124 @ 13M_1 124 0 1 124 @ 13M_2 125 0 124 124 @ 13M_3 125 124 124 1 @ 13M_4 125 125 124 124 @ 13M_5 124 125 1 124 @ 13M_6 0 125 124 124 @ 13M_7 0 124 124 1 ", //13
"M 307 264 @ 14M_0 0 0 153 88 @ 14M_1 153 0 1 88 @ 14M_2 154 0 153 88 @ 14M_3 154 88 153 88 @ 14M_4 154 176 153 88 @ 14M_5 153 176 1 88 @ 14M_6 0 176 153 88 @ 14M_7 0 88 153 88 ", //14
"M 120 137 @ 15M_0 0 0 32 68 @ 15M_1 32 0 56 68 @ 15M_2 88 0 32 68 @ 15M_3 88 68 11 1 @ 15M_4 88 69 32 68 @ 15M_5 32 69 56 68 @ 15M_6 0 69 32 68 @ 15M_7 0 68 11 1 ", //15
"M 67 67 @ 16M_0 0 0 33 33 @ 16M_1 33 0 1 33 @ 16M_2 34 0 33 33 @ 16M_3 34 33 33 1 @ 16M_4 34 34 33 33 @ 16M_5 33 34 1 33 @ 16M_6 0 34 33 33 @ 16M_7 0 33 33 1 ", //16
"S ", //17
"S ", //18
"S ", //19
"S ", //20
"M 120 120 @ 21M_0 0 0 56 56 @ 21M_1 56 0 8 56 @ 21M_2 64 0 56 56 @ 21M_3 64 56 56 8 @ 21M_4 64 64 56 56 @ 21M_5 56 64 8 56 @ 21M_6 0 64 56 56 @ 21M_7 0 56 56 8 ", //21
"M 83 83 @ 22M_0 0 0 41 41 @ 22M_1 41 0 1 41 @ 22M_2 42 0 41 41 @ 22M_3 42 41 36 1 @ 22M_4 42 42 41 41 @ 22M_5 41 42 1 41 @ 22M_6 0 42 41 41 @ 22M_7 0 41 41 1 ", //22
"M 264 264 @ 23M_0 0 0 112 112 @ 23M_1 112 0 40 112 @ 23M_2 152 0 112 112 @ 23M_3 152 112 112 40 @ 23M_4 152 152 112 112 @ 23M_5 112 152 40 112 @ 23M_6 0 152 112 112 @ 23M_7 0 112 112 40 ", //23
"S ", //24
"S ", //25
"M 66 65 @ 26M_0 0 0 32 32 @ 26M_1 32 0 1 32 @ 26M_2 33 0 33 32 @ 26M_3 33 32 32 1 @ 26M_4 33 33 33 32 @ 26M_5 32 33 1 32 @ 26M_6 0 33 32 32 @ 26M_7 0 32 32 1 ", //26
"S ", //27
"M 66 65 @ 28M_0 0 0 32 32 @ 28M_1 32 0 1 32 @ 28M_2 33 0 33 32 @ 28M_3 33 32 32 1 @ 28M_4 33 33 33 32 @ 28M_5 32 33 1 32 @ 28M_6 0 33 32 32 @ 28M_7 0 32 32 1 ", //28
"M 186 186 @ 29M_0 0 0 88 88 @ 29M_1 88 0 10 88 @ 29M_2 98 0 88 88 @ 29M_3 98 88 88 10 @ 29M_4 98 98 88 88 @ 29M_5 88 98 10 88 @ 29M_6 0 98 88 88 @ 29M_7 0 88 88 10 ", //29
"S ", //30
"S ", //31
"S ", //32
"S ", //33
"S ", //34
"S ", //35
"M 728 728 @ 36M_0 0 0 360 360 @ 36M_1 360 0 8 360 @ 36M_2 368 0 360 360 @ 36M_3 368 360 360 8 @ 36M_4 368 368 360 360 @ 36M_5 360 368 8 360 @ 36M_6 0 368 360 360 @ 36M_7 0 360 360 8 ", //36
"S ", //37
"M 728 728 @ 38M_0 0 0 360 360 @ 38M_1 360 0 8 360 @ 38M_2 368 0 360 360 @ 38M_3 368 360 360 8 @ 38M_4 368 368 360 360 @ 38M_5 360 368 8 360 @ 38M_6 0 368 360 360 @ 38M_7 0 360 360 8 ", //38
"S ", //39
"S ", //40
"M 170 170 @ 41M_0 0 0 70 70 @ 41M_1 70 0 30 70 @ 41M_2 100 0 70 70 @ 41M_3 100 70 70 30 @ 41M_4 100 100 70 70 @ 41M_5 70 100 30 70 @ 41M_6 0 100 70 70 @ 41M_7 0 70 70 30 ", //41
"M 362 362 @ 42M_0 0 0 166 166 @ 42M_1 166 0 30 166 @ 42M_2 196 0 166 166 @ 42M_3 196 166 166 30 @ 42M_4 196 196 166 166 @ 42M_5 166 196 30 166 @ 42M_6 0 196 166 166 @ 42M_7 0 166 166 30 ", //42
"S ", //43
"S ", //44
"M 133 133 @ 45M_0 0 0 66 66 @ 45M_1 66 0 1 66 @ 45M_2 67 0 66 66 @ 45M_3 67 66 66 1 @ 45M_4 67 67 66 66 @ 45M_5 66 67 1 66 @ 45M_6 0 67 66 66 @ 45M_7 0 66 66 1 ", //45
"S ", //46
"S ", //47
"S ", //48
"S ", //49
"M 186 186 @ 50M_0 0 0 88 88 @ 50M_1 88 0 10 88 @ 50M_2 98 0 88 88 @ 50M_3 98 88 88 10 @ 50M_4 98 98 88 88 @ 50M_5 88 98 10 88 @ 50M_6 0 98 88 88 @ 50M_7 0 88 88 10 ", //50
"S ", //51
"S ", //52
"M 186 186 @ 53M_0 0 0 88 88 @ 53M_1 88 0 10 88 @ 53M_2 98 0 88 88 @ 53M_3 98 88 88 10 @ 53M_4 98 98 88 88 @ 53M_5 88 98 10 88 @ 53M_6 0 98 88 88 @ 53M_7 0 88 88 10 ", //53
"M 186 186 @ 54M_0 0 0 88 88 @ 54M_1 88 0 10 88 @ 54M_2 98 0 88 88 @ 54M_3 98 88 88 10 @ 54M_4 98 98 88 88 @ 54M_5 88 98 10 88 @ 54M_6 0 98 88 88 @ 54M_7 0 88 88 10 ", //54
"M 186 186 @ 55M_0 0 0 88 88 @ 55M_1 88 0 10 88 @ 55M_2 98 0 88 88 @ 55M_3 98 88 88 10 @ 55M_4 98 98 88 88 @ 55M_5 88 98 10 88 @ 55M_6 0 98 88 88 @ 55M_7 0 88 88 10 ", //55
"M ", //56
"M ", //57
"M ", //58
"M ", //59
"S ", //60
"M ", //61
"M ", //62
"M ", //63
"M ", //64
"M ", //65
"M ", //66
"M ", //67
"S ", //68
"S ", //69
"M ", //70
"M ", //71
"M ", //72
"S ", //73
"S ", //74
"M ", //75
"S ", //76
"M ", //77
"S ", //78
"S ", //79
"S ", //80
"S ", //81
"S ", //82
"S ", //83
"S ", //84
"S ", //85
"S ", //86
"S ", //87
"S ", //88
"S ", //89
"S ", //90
"M ", //91
"S ", //92
"M ", //93
"S ", //94
"M ", //95
"M ", //96
"M ", //97
"S ", //98
"M ", //99
"S ", //100
"M ", //101
"M ", //102
"M ", //103
"M ", //104
"M ", //105
"M ", //106
"M ", //107
"M 341 340 @ 108M_0 0 0 142 142 @ 108M_1 142 0 57 142 @ 108M_2 199 0 142 142 @ 108M_3 199 142 142 56 @ 108M_4 199 198 142 142 @ 108M_5 142 198 57 142 @ 108M_6 0 198 142 142 @ 108M_7 0 142 142 56 ", //108
"M 582 583 @ 109M_0 0 0 235 236 @ 109M_1 235 0 112 236 @ 109M_2 347 0 235 236 @ 109M_3 347 236 235 111 @ 109M_4 347 347 235 236 @ 109M_5 235 347 112 236 @ 109M_6 0 347 235 236 @ 109M_7 0 236 235 111 ", //109
"M 220 219 @ 110M_0 0 0 80 79 @ 110M_1 80 0 60 79 @ 110M_2 140 0 80 79 @ 110M_3 140 79 80 60 @ 110M_4 140 139 80 80 @ 110M_5 80 139 60 79 @ 110M_6 0 139 80 80 @ 110M_7 0 79 80 60 ", //110
"M 270 270 @ 111M_0 0 0 90 90 @ 111M_1 90 0 90 90 @ 111M_2 180 0 90 90 @ 111M_3 180 90 90 90 @ 111M_4 180 180 90 90 @ 111M_5 90 180 90 90 @ 111M_6 0 180 90 90 @ 111M_7 0 90 90 90 ", //111
"M 270 270 @ 112M_0 0 0 90 90 @ 112M_1 90 0 90 90 @ 112M_2 180 0 90 90 @ 112M_3 180 90 90 90 @ 112M_4 180 180 90 90 @ 112M_5 90 180 90 90 @ 112M_6 0 180 90 90 @ 112M_7 0 90 90 90 ", //112
"M 322 322 @ 113M_0 0 0 122 122 @ 113M_1 122 0 78 122 @ 113M_2 200 0 122 122 @ 113M_3 200 122 122 78 @ 113M_4 200 200 122 122 @ 113M_5 122 200 78 122 @ 113M_6 0 200 122 122 @ 113M_7 0 122 122 78 ", //113
"M 88 88 @ 114M_0 0 0 40 40 @ 114M_1 40 0 8 40 @ 114M_2 48 0 40 40 @ 114M_3 48 40 40 8 @ 114M_4 48 48 40 40 @ 114M_5 40 48 8 40 @ 114M_6 0 48 40 40 @ 114M_7 0 40 40 8 ", //114
"S ", //115
"M ", //116
"M ", //117
"S ", //118
"M 315 315 @ 119M_0 0 0 132 132 @ 119M_1 132 0 51 132 @ 119M_2 183 0 132 132 @ 119M_3 183 132 132 51 @ 119M_4 183 183 132 132 @ 119M_5 132 183 51 132 @ 119M_6 0 183 132 131 @ 119M_7 0 132 132 51 ", //119
"M 169 169 @ 120M_0 0 0 60 60 @ 120M_1 60 0 49 60 @ 120M_2 109 0 60 60 @ 120M_3 109 60 60 49 @ 120M_4 109 109 60 60 @ 120M_5 60 109 49 60 @ 120M_6 0 109 60 60 @ 120M_7 0 60 60 49 ", //120
"M ", //121
"M 304 304 @ 122M_0 0 0 112 112 @ 122M_1 112 0 80 112 @ 122M_2 192 0 112 112 @ 122M_3 192 112 112 80 @ 122M_4 192 192 112 112 @ 122M_5 112 192 80 112 @ 122M_6 0 192 112 112 @ 122M_7 0 112 112 80 ", //122
"M 231 231 @ 123M_0 0 0 76 76 @ 123M_1 76 0 79 76 @ 123M_2 155 0 76 76 @ 123M_3 155 76 76 79 @ 123M_4 155 155 76 76 @ 123M_5 76 155 79 76 @ 123M_6 0 155 76 76 @ 123M_7 0 76 76 79 ", //123
"M 82 82 @ 124M_0 0 0 31 31 @ 124M_1 31 0 20 31 @ 124M_2 51 0 31 31 @ 124M_3 51 31 31 20 @ 124M_4 51 51 31 31 @ 124M_5 31 51 20 31 @ 124M_6 0 51 31 31 @ 124M_7 0 31 31 20 ", //124
"M ", //125
"M ", //126
"M ", //127
"M ", //128
"M 104 104 @ 129M_0 0 0 48 48 @ 129M_1 48 0 8 48 @ 129M_2 56 0 48 48 @ 129M_3 56 48 48 8 @ 129M_4 56 56 48 48 @ 129M_5 48 56 8 48 @ 129M_6 0 56 48 48 @ 129M_7 0 48 48 8 ", //129
"M ", //130
"M ", //131
"M ", //132
"M ", //133
"M ", //134
"M ", //135
"M ", //136
"M ", //137
"S ", //138
"M ", //139
"M 104 104 @ 140M_0 0 0 48 48 @ 140M_1 48 0 8 48 @ 140M_2 56 0 48 48 @ 140M_3 56 48 48 8 @ 140M_4 56 56 48 48 @ 140M_5 48 56 8 48 @ 140M_6 0 56 48 48 @ 140M_7 0 48 48 8 ", //140
"M ", //141
"M 104 104 @ 142M_0 0 0 48 48 @ 142M_1 48 0 8 48 @ 142M_2 56 0 48 48 @ 142M_3 56 48 48 8 @ 142M_4 56 56 48 48 @ 142M_5 48 56 8 48 @ 142M_6 0 56 48 48 @ 142M_7 0 48 48 8 ", //142
"M ", //143
"M ", //144
"M ", //145
"S ", //146
"M ", //147
"M ", //148
"M ", //149
"M ", //150
"M ", //151
"M ", //152
"M ", //153
"M ", //154
"M ", //155
"M ", //156
"M ", //157
"M ", //158
"M ", //159
" ", //160
" ", //161
" ", //162
" ", //163
" ", //164
" ", //165
" ", //166
" ", //167
" ", //168
" ", //169
" ", //170
" ", //171
" ", //172
" ", //173
" ", //174
" ", //175
" ", //176
" ", //177
" ", //178
" ", //179
" ", //180
" ", //181
" ", //182
" ", //183
" ", //184
" ", //185
" ", //186
" ", //187
" ", //188
" ", //189
" ", //190
" ", //191
" ", //192
" ", //193
" ", //194
" ", //195
" ", //196
" ", //197
" ", //198
" ", //199
" ", //200
" ", //201
" ", //202
" ", //203
" ", //204
" ", //205
" ", //206
" ", //207
" ", //208
" ", //209
" ", //210
" ", //211
" ", //212
" ", //213
" ", //214
" ", //215
" ", //216
" ", //217
" ", //218
" ", //219
" ", //220
" ", //221
" ", //222
" ", //223
" ", //224
" ", //225
" ", //226
" ", //227
"M ", //228
"M ", //229
"M 370 370 @ 230M_0 0 0 160 160 @ 230M_1 160 0 50 160 @ 230M_2 210 0 160 160 @ 230M_3 210 160 160 50 @ 230M_4 210 210 160 160 @ 230M_5 160 210 50 160 @ 230M_6 0 210 160 160 @ 230M_7 0 160 160 50 ", //230
"M ", //231
"M ", //232
"S ", //233
"M ", //234
"S ", //235
"M ", //236
"M ", //237
"M ", //238
"S ", //239
"M ", //240
"M ", //241
"M ", //242
"M ", //243
"M ", //244
"M ", //245
"M ", //246
"M ", //247
"M ", //248
"M ", //249
"S ", //250
"M ", //251
"M ", //252
"M ", //253
"M 322 322 @ 254M_0 0 0 117 117 @ 254M_1 117 0 88 117 @ 254M_2 205 0 117 117 @ 254M_3 205 117 117 88 @ 254M_4 205 205 117 117 @ 254M_5 117 205 88 117 @ 254M_6 0 205 117 117 @ 254M_7 0 117 117 88 ", //254
"M 464 464 @ 255M_0 0 0 162 162 @ 255M_1 162 0 140 162 @ 255M_2 302 0 162 162 @ 255M_3 302 162 162 140 @ 255M_4 302 302 162 162 @ 255M_5 162 302 140 162 @ 255M_6 0 302 162 162 @ 255M_7 0 162 162 140 ", //255
"M 330 330 @ 256M_0 0 0 133 133 @ 256M_1 133 0 64 133 @ 256M_2 197 0 133 133 @ 256M_3 197 133 133 64 @ 256M_4 197 197 133 133 @ 256M_5 133 197 64 133 @ 256M_6 0 197 133 133 @ 256M_7 0 133 133 64 ", //256
"M 328 328 @ 257M_0 0 0 129 129 @ 257M_1 129 0 70 129 @ 257M_2 199 0 129 129 @ 257M_3 199 129 129 70 @ 257M_4 199 199 129 129 @ 257M_5 129 199 70 129 @ 257M_6 0 199 129 129 @ 257M_7 0 129 129 70 ", //257
"M 221 221 @ 258M_0 0 0 87 87 @ 258M_1 87 0 47 87 @ 258M_2 134 0 87 87 @ 258M_3 134 87 87 47 @ 258M_4 134 134 87 87 @ 258M_5 87 134 47 87 @ 258M_6 0 134 87 87 @ 258M_7 0 87 87 47 ", //258
"M 315 315 @ 259M_0 0 0 128 128 @ 259M_1 128 0 59 128 @ 259M_2 187 0 128 128 @ 259M_3 187 128 128 59 @ 259M_4 187 187 128 128 @ 259M_5 128 187 58 128 @ 259M_6 0 187 128 128 @ 259M_7 0 128 128 59 ", //259
"M 486 487 @ 260M_0 0 0 173 173 @ 260M_1 173 0 140 173 @ 260M_2 313 0 173 173 @ 260M_3 313 173 173 140 @ 260M_4 313 313 173 173 @ 260M_5 173 313 140 174 @ 260M_6 0 313 173 173 @ 260M_7 0 173 173 140 ", //260
"M 272 272 @ 261M_0 0 0 102 102 @ 261M_1 102 0 68 102 @ 261M_2 170 0 102 102 @ 261M_3 170 102 102 68 @ 261M_4 170 170 102 102 @ 261M_5 102 170 68 102 @ 261M_6 0 170 102 102 @ 261M_7 0 102 102 68 ", //261
"M 292 346 @ 262M_0 0 0 113 140 @ 262M_1 113 0 66 140 @ 262M_2 179 0 113 140 @ 262M_3 179 140 113 66 @ 262M_4 179 206 113 140 @ 262M_5 113 206 66 140 @ 262M_6 0 206 113 140 @ 262M_7 0 140 113 66 ", //262
"M 180 180 @ 263M_0 0 0 74 74 @ 263M_1 74 0 32 74 @ 263M_2 106 0 74 74 @ 263M_3 106 74 74 32 @ 263M_4 106 106 74 74 @ 263M_5 74 106 32 74 @ 263M_6 0 106 74 74 @ 263M_7 0 74 74 32 ", //263
"M 214 214 @ 264M_0 0 0 90 90 @ 264M_1 90 0 34 90 @ 264M_2 124 0 90 90 @ 264M_3 124 90 90 34 @ 264M_4 124 124 90 90 @ 264M_5 90 124 34 90 @ 264M_6 0 124 90 90 @ 264M_7 0 90 90 34 ", //264
"M 201 201 @ 265M_0 0 0 81 81 @ 265M_1 81 0 39 81 @ 265M_2 120 0 81 81 @ 265M_3 120 81 81 39 @ 265M_4 120 120 81 81 @ 265M_5 81 120 39 81 @ 265M_6 0 120 81 81 @ 265M_7 0 81 81 39 ", //265
"M 410 410 @ 266M_0 0 0 161 161 @ 266M_1 161 0 88 161 @ 266M_2 249 0 161 161 @ 266M_3 249 161 161 88 @ 266M_4 249 249 161 161 @ 266M_5 161 249 88 161 @ 266M_6 0 249 161 161 @ 266M_7 0 161 161 88 ", //266
"M 300 300 @ 267M_0 0 0 131 131 @ 267M_1 131 0 38 131 @ 267M_2 169 0 131 131 @ 267M_3 169 131 131 38 @ 267M_4 169 169 131 131 @ 267M_5 131 169 38 131 @ 267M_6 0 169 131 131 @ 267M_7 0 131 131 38 ", //267
"M 389 389 @ 268M_0 0 0 155 155 @ 268M_1 155 0 79 155 @ 268M_2 234 0 155 155 @ 268M_3 234 155 155 79 @ 268M_4 234 234 155 155 @ 268M_5 155 234 79 155 @ 268M_6 0 234 155 155 @ 268M_7 0 155 155 79 ", //268
"M 389 389 @ 269M_0 0 0 155 155 @ 269M_1 155 0 79 155 @ 269M_2 234 0 155 155 @ 269M_3 234 155 155 79 @ 269M_4 234 234 155 155 @ 269M_5 155 234 79 155 @ 269M_6 0 234 155 155 @ 269M_7 0 155 155 79 ", //269
"M 289 253 @ 270M_0 0 0 126 108 @ 270M_1 126 0 37 108 @ 270M_2 163 0 126 108 @ 270M_3 163 108 126 37 @ 270M_4 163 145 126 108 @ 270M_5 126 145 37 108 @ 270M_6 0 145 126 108 @ 270M_7 0 108 126 37 ", //270
"M 267 267 @ 271M_0 0 0 102 102 @ 271M_1 102 0 63 102 @ 271M_2 165 0 102 102 @ 271M_3 165 102 102 63 @ 271M_4 165 165 102 102 @ 271M_5 102 165 63 102 @ 271M_6 0 165 102 102 @ 271M_7 0 102 102 63 ", //271
"M 440 440 @ 272M_0 0 0 162 162 @ 272M_1 162 0 116 162 @ 272M_2 278 0 162 162 @ 272M_3 278 162 162 116 @ 272M_4 278 278 162 162 @ 272M_5 162 278 116 161 @ 272M_6 0 278 162 162 @ 272M_7 0 162 162 116 ", //272
"M 238 250 @ 273M_0 0 0 93 99 @ 273M_1 93 0 52 99 @ 273M_2 145 0 93 99 @ 273M_3 145 99 93 52 @ 273M_4 145 151 93 99 @ 273M_5 93 151 52 99 @ 273M_6 0 151 93 99 @ 273M_7 0 99 93 52 ", //273
"S ", //274
"M 270 270 @ 275M_0 0 0 116 116 @ 275M_1 116 0 38 116 @ 275M_2 154 0 116 116 @ 275M_3 154 116 116 38 @ 275M_4 154 154 116 116 @ 275M_5 116 154 38 116 @ 275M_6 0 154 116 116 @ 275M_7 0 116 116 38 ", //275
"M ", //276
"M 200 200 @ 277M_0 0 0 90 90 @ 277M_1 90 0 20 90 @ 277M_2 110 0 90 90 @ 277M_3 110 90 90 20 @ 277M_4 110 110 90 90 @ 277M_5 90 110 20 90 @ 277M_6 0 110 90 90 @ 277M_7 0 90 90 20 ", //277
"M 200 200 @ 278M_0 0 0 90 90 @ 278M_1 90 0 20 90 @ 278M_2 110 0 90 90 @ 278M_3 110 90 90 20 @ 278M_4 110 110 90 90 @ 278M_5 90 110 20 90 @ 278M_6 0 110 90 90 @ 278M_7 0 90 90 20 ", //278
"M 200 200 @ 279M_0 0 0 90 90 @ 279M_1 90 0 20 90 @ 279M_2 110 0 90 90 @ 279M_3 110 90 90 20 @ 279M_4 110 110 90 90 @ 279M_5 90 110 20 90 @ 279M_6 0 110 90 90 @ 279M_7 0 90 90 20 ", //279
"M 200 276 @ 280M_0 0 0 90 90 @ 280M_1 90 0 20 90 @ 280M_2 110 0 90 90 @ 280M_3 110 90 90 20 @ 280M_4 110 110 90 166 @ 280M_5 90 110 20 166 @ 280M_6 0 110 90 166 @ 280M_7 0 90 90 20 ", //280
];

var frameNum = frameDefEnum.length;

var sourcePicEnum = 
[
"Resource/girl.jpg",
"Resource/kanade.jpg",
"Resource/AngelBeats.jpg",
"Resource/house.jpg",
"Resource/dish.jpg",
"Resource/godness.jpg",
"Resource/woman.jpg",
"Resource/woman2.jpg",
"Resource/xiada.jpg",
"Resource/boy.jpg",
"Resource/mountain.jpg",
"Resource/sky.jpg",
"Resource/flower1.jpg",
"Resource/flower2.jpg",
"Resource/ballon.jpg",
"Resource/oldmotorcycle.jpg",
"Resource/newmotorcycle.jpg",
"Resource/dandelion.jpg",
"Resource/pipeXgrass.jpg",
"Resource/rose.jpg",
"Resource/new1.jpg",
"Resource/new2.jpg",
"Resource/new3.jpg",
"Resource/new4.jpg",
];


