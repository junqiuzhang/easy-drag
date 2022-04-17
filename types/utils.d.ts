/**
 * 向量类型
 */
export declare type TVector = [number, number];
/**
 * 向量范围
 */
export declare type TVectorRange = [number, number, number, number];
/**
 * 向量加法
 * @param vector1 向量1
 * @param vector2 向量2
 * @returns 向量1 + 向量2
 */
export declare const addVector: (vector1: TVector, vector2: TVector) => TVector;
/**
 * 向量减法
 * @param vector1 向量1
 * @param vector2 向量2
 * @returns 向量2 - 向量1
 */
export declare const minusVector: (
  vector1: TVector,
  vector2: TVector
) => TVector;
/**
 * 规范化向量
 * @param vector 向量
 * @param range 向量取值范围
 * @returns 规范化后的向量
 */
export declare const formatVector: (
  vector: TVector,
  range: number[]
) => TVector;
/**
 * 从旧transform属性和偏移向量获取新transform属性
 * @param transform 旧transform属性
 * @param vector 偏移向量
 * @returns 新transform属性
 */
export declare const setTranslatePosition: (
  transform: string,
  vector: TVector
) => string;
export declare const getPosition: (e: MouseEvent | TouchEvent) => TVector;
export declare const isMobile: () => boolean;
