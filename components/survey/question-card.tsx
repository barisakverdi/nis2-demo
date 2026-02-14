'use client';

import { Question, QuestionOption } from '@/lib/mock-data/questions';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerChange: (questionId: string, answerId: string) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswerChange }: QuestionCardProps) {
  return (
    <div className="card rounded-card shadow-card">
      <div className="card-content">
        {/* Assessment Type Badge */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 mb-6">
          <span className="text-[11px] font-semibold text-primary tracking-wider">
            EXAMPLE COMPANY - NIS2 ASSESSMENT TYPE: ESSENTIAL
          </span>
        </div>

        {/* Question */}
        <h2 className="text-h3 mb-2">{question.question}</h2>

        {/* Help Text */}
        <p className="text-body-sm text-muted-foreground italic mb-8">{question.helptext}</p>

        {/* Answer Options */}
        <RadioGroup
          value={selectedAnswer}
          onValueChange={(value) => onAnswerChange(question.id, value)}
          className="space-y-4"
        >
          {question.options.map((option: QuestionOption, index: number) => (
            <div
              key={option.id}
              className={cn(
                'relative flex items-start p-container-md rounded-input border-2 transition-all cursor-pointer hover:border-primary/50 hover:bg-accent/5',
                selectedAnswer === option.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-background'
              )}
              onClick={() => onAnswerChange(question.id, option.id)}
            >
              {/* Hidden Radio Button for accessibility */}
              <RadioGroupItem value={option.id} id={option.id} className="sr-only" />

              {/* Option Content */}
              <div className="flex-1 min-w-0">
                <Label htmlFor={option.id} className="cursor-pointer">
                  {/* Option Text */}
                  <span className="text-body-md leading-relaxed block">{option.text}</span>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
