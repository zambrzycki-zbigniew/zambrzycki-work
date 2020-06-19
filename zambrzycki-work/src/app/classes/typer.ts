import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export class Typer {
    lines: Line[];
    output = {"value": ""};
    interval: TyperInterval;
    constructor(arr: any[], interval: TyperInterval) {
        this.output = {"value": ""};
        this.lines = [];
        arr.forEach(line => {
                this.lines.push(new Line(String(line)))
            });
        this.interval=interval;
    }

    type() {
        this.lines.forEach(line => { line.type(this.output, this.interval) })
    }
}

class Line {
    words: Word[];
    constructor(line: string) {
        this.words = [];
        line.split(" ").forEach(word => {
            this.words.push(new Word(word))
        })
    }

    type(output, interval: TyperInterval) {
        this.words.forEach((word, key, arr) => { word.type(output, interval, Object.is(arr.length - 1, key)) })
        interval.totalTime = Math.floor(Math.random()*interval.lineWaitOffset)+interval.lineWait+interval.totalTime;
        setTimeout(function() {output.value=String(output.value) + "<br><br>";}, interval.totalTime);
    }
}

class Word {
    characters: Character[];
    constructor(word: string) {
        this.characters = [];
        word.split("").forEach(character => {
            this.characters.push(new Character(character))
        })
    }

    type(output, interval: TyperInterval, islast:boolean) {
        this.characters.forEach(character => { character.type(output, interval) })
        if(!islast) {
            interval.totalTime = Math.floor(Math.random()*interval.wordWaitOffset)+interval.wordWait+interval.totalTime;
            setTimeout(function() {output.value=String(output.value) +" ";}, interval.totalTime);
        }
    }
}

class Character {
    character: string;
    backspace: boolean = false;
    constructor(character: string) {
        this.character=character;
        if(character==="@") {
            this.backspace=true;
        }
    }

    type(output, interval: TyperInterval) {
        var char = this
        if(this.backspace) {
            interval.totalTime = (Math.floor(Math.random()*interval.characterWaitOffset)+interval.characterWait)/3+interval.totalTime;
            setTimeout(function() {output.value = String(output.value).substring(0, String(output.value).length - 1);}, interval.totalTime);
        } else {
            interval.totalTime = Math.floor(Math.random()*interval.characterWaitOffset)+interval.characterWait+interval.totalTime;
            setTimeout(function() {output.value=String(output.value) + char.character;}, interval.totalTime);
        }
    }
}

export class TyperInterval {
    initialWait: number;
    lineWait: number;
    lineWaitOffset: number;
    wordWait: number;
    wordWaitOffset: number;
    characterWait: number;
    characterWaitOffset: number;
    totalTime: number = 0;
    constructor(
        initialWait, lineWait, lineWaitOffset, wordWait,
        wordWaitOffset, characterWait, characterWaitOffset) {
            this.initialWait = initialWait;
            this.lineWait = lineWait;
            this.lineWaitOffset = lineWaitOffset;
            this.wordWait = wordWait;
            this.wordWaitOffset = wordWaitOffset;
            this.characterWait = characterWait;
            this.characterWaitOffset = characterWaitOffset;
    }
}