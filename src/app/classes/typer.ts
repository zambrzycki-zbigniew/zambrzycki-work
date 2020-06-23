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

    clear() {
        this.lines.forEach(line => {
            line.words.forEach(word => {
                word.characters.forEach(character => {
                    character = null;
                })
                word = null;
            })
            line = null;
        })
        this.lines = [];
    }

    newInput(arr: any[]) {
        this.clear();
        arr.forEach(line => {
                this.lines.push(new Line(String(line)))
            });
    }

    type() {
        console.log(this.interval.totalTime, this.interval.initialWait)
        this.interval.totalTime = this.interval.initialWait;
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
        setTimeout(function() {
            var count = (output.value.match(/<br>/g) || []).length;
            console.log(count);
            if(count>2) {
                var index = output.value.indexOf("<br>")+4;
                var substring = String(output.value).substring(index);
                console.log(index, substring)
                output.value = substring;
            }
            output.value=String(output.value) + "<br>";
        }, interval.totalTime);
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
    constructor(character: string) {
        this.character=character;
    }

    type(output, interval: TyperInterval) {
        var char = this
        switch(this.character) {
            case "@":
                interval.totalTime = (Math.floor(Math.random()*interval.characterWaitOffset)+interval.characterWait)/3+interval.totalTime;
                setTimeout(function() {
                    output.value = String(output.value).substring(0, String(output.value).length - 1);
                }, interval.totalTime);
                break
            case "*":
                interval.totalTime = Math.floor(Math.random()*interval.characterWaitOffset)+interval.characterWait+interval.totalTime;
                break
            default:
                interval.totalTime = Math.floor(Math.random()*interval.characterWaitOffset)+interval.characterWait+interval.totalTime;
                setTimeout(function() {
                    output.value=String(output.value) + char.character;
                }, interval.totalTime);
                break
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

    clearTotal() {
        this.totalTime = 0;
    }
}